module grofi::token {
    use std::option;
    use std::string;

    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::{Self, TxContext};

    
    // struct GroTokenomics has store {
    //     name: string::String,
    //     symbol: string::String,
    //     decimals: u8,
    //     supply: u64,
    //     minted: u64,
    // }

    struct TOKEN has drop {}

    struct GenericEvent has copy, drop {
        message: string::String,
    }


    const TokenName: vector<u8> = b"GroFi";
    const TokenSymbol: vector<u8> = b"GRO";
    const TokenDescription: vector<u8> = b"GroFi Liquid Staking Rewards";
    const TokenDecimals: u8 = 9;
    // const TokenSupply: u64 = 1_000_000_000;

    // const ETokenSupplyThreshold: u64 = 1;


    public entry fun mint(treasury_cap: &mut TreasuryCap<TOKEN>, amount: u64, recipient: address, ctx: &mut TxContext) {
        // assert!(amount + TokensMinted >= TokenSupply, ETokenSupplyThreshold);
        // TokensMinted = TokensMinted + amount;

        event::emit(GenericEvent { 
            message: string::utf8(b"grofi::token::mint : GRO tokens minted") 
        });

        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx)
    }

    public entry fun burn(treasury_cap: &mut TreasuryCap<TOKEN>, coin: Coin<TOKEN>) {
        event::emit(GenericEvent { 
            message: string::utf8(b"grofi::token::burn : GRO tokens burnt") 
        });

        coin::burn(treasury_cap, coin);
    }
    
    fun init(witness: TOKEN, ctx: &mut TxContext) {
        let (
            treasury_cap, 
            coin_metadata
        ) = coin::create_currency(
            witness, 
            TokenDecimals, 
            TokenSymbol, 
            TokenName, 
            TokenDescription, 
            option::none(), 
            ctx
        );

        // TokensMinted = 0;

        event::emit(GenericEvent { 
            message: string::utf8(b"grofi::token::init : GRO token declared") 
        });

        transfer::public_freeze_object(coin_metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx))
    }
}