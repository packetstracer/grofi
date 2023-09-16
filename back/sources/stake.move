module grofi::stake {
    use sui::sui::SUI;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::balance::{Self, Balance};

    use sui_system::staking_pool::{Self, StakedSui};
    
    struct GrofiStakedSui has key, store {
        id: UID,
        staked_sui: StakedSui,
        balance: u64,
        borrowed: u64,
    }

    const ENotEnoughRewards: u64 = 1;

    public entry fun create_wrapped_staked_sui(staked_sui: StakedSui, ctx: &mut TxContext) {
        let staked_balance: u64 = staking_pool::staked_sui_amount(&staked_sui);

        let wrapped_staked_sui = GrofiStakedSui{
            id: object::new(ctx),
            staked_sui,
            balance: staked_balance,
            borrowed: 0,
        };

        transfer::transfer(wrapped_staked_sui, tx_context::sender(ctx));
    }

    public entry fun destroy_wrapped_staked_sui(wrapped_staked_sui: GrofiStakedSui, ctx: &mut TxContext) {
        let GrofiStakedSui { id, staked_sui, balance, borrowed } = wrapped_staked_sui;

        let staked_balance: u64 = staking_pool::staked_sui_amount(&staked_sui);
        let rewardsGenerated: u64 =  staked_balance - balance;

        // assert!(rewardsGenerated > borrowed, ENotEnoughRewards);

        transfer::public_transfer(staked_sui, tx_context::sender(ctx));
        object::delete(id);
    }

    public entry fun borrow_rewards(wrapped_staked_sui: &mut GrofiStakedSui, amount: u64) {
        wrapped_staked_sui.borrowed = wrapped_staked_sui.borrowed + amount;
    }
}