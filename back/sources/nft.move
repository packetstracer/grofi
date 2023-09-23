module grofi::nft {
    use std::string;

    use sui::url::{Self, Url};
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::{Self, TxContext};


    struct ProjectInvestmentNft has key, store {
        id: UID,
        project_id: u64,
        name: string::String,
        description: string::String, 
        url: Url,
    }

    struct GenericEvent has copy, drop {
        id: ID,
        message: string::String,
    }


    public entry fun mint(name: vector<u8>, project_id: u64, description: vector <u8>, url: vector <u8>, ctx: &mut TxContext) {
        let nft = ProjectInvestmentNft {
            id: object::new(ctx),
            project_id,
            name: string::utf8(name), 
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
        };

        event::emit(GenericEvent { 
            id: object::uid_to_inner(&nft.id), 
            message: string::utf8(b"grofi::nft::mint : NFT minted") 
        });

        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun transfer(nft: ProjectInvestmentNft, recipient: address) {
        event::emit(GenericEvent { 
            id: object::uid_to_inner(&nft.id), 
            message: string::utf8(b"grofi::nft::transfer : NFT transferred to owner") 
        });

        transfer::transfer(nft, recipient);
    }
}