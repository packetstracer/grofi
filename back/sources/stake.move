module grofi::stake {
    use std::string;

    // use sui::sui::SUI;
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    // use sui::balance::{Self, Balance};

    use sui_system::staking_pool::{Self, StakedSui};


    struct GrofiStakedSui has key, store {
        id: UID,
        staked_sui: StakedSui,
        balance: u64,
        borrowed: u64,
    }

    struct GenericEvent has copy, drop {
        id: ID,
        message: string::String,
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

        event::emit(GenericEvent { 
            id: object::uid_to_inner(&wrapped_staked_sui.id), 
            message: string::utf8(b"grofi::stake::create_wrapped_staked_sui : wrapped StakedSui object created") 
        });

        transfer::transfer(wrapped_staked_sui, tx_context::sender(ctx));
    }

    public entry fun destroy_wrapped_staked_sui(wrapped_staked_sui: GrofiStakedSui, ctx: &mut TxContext) {
        let GrofiStakedSui { id, staked_sui, balance: _, borrowed: _ } = wrapped_staked_sui;
        // let GrofiStakedSui { id, staked_sui, balance, borrowed } = wrapped_staked_sui;

        // let staked_balance: u64 = staking_pool::staked_sui_amount(&staked_sui);
        // let rewardsGenerated: u64 =  staked_balance - balance;

        // assert!(rewardsGenerated > borrowed, ENotEnoughRewards);

        event::emit(GenericEvent { 
            id: object::uid_to_inner(&id), 
            message: string::utf8(b"grofi::stake::destroy_wrapped_staked_sui : wrapped StakedSui object destroyed") 
        });

        transfer::public_transfer(staked_sui, tx_context::sender(ctx));
        object::delete(id);
    }

    public entry fun borrow_rewards(wrapped_staked_sui: &mut GrofiStakedSui, amount: u64) {
        wrapped_staked_sui.borrowed = wrapped_staked_sui.borrowed + amount;

        event::emit(GenericEvent { 
            id: object::uid_to_inner(&wrapped_staked_sui.id), 
            message: string::utf8(b"grofi::stake::borrow_rewards : borrowed rewards") 
        });
    }

    public entry fun return_rewards(wrapped_staked_sui: &mut GrofiStakedSui, amount: u64) {
        assert!(wrapped_staked_sui.borrowed >= amount, ENotEnoughRewards);

        wrapped_staked_sui.borrowed = wrapped_staked_sui.borrowed - amount;

        event::emit(GenericEvent { 
            id: object::uid_to_inner(&wrapped_staked_sui.id), 
            message: string::utf8(b"grofi::stake::return_rewards : returned rewards") 
        });
    }
}