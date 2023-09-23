module grofi::nft {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};


    struct ProjectInvestmentNft has key, store {
        id: UID,
        project_id: u64,
        name: string::String,
        description: string::String, 
        url: Url,
    }


    public entry fun mint(name: vector<u8>, project_id: u64, description: vector <u8>, url: vector <u8>, ctx: &mut TxContext) {
        let nft = ProjectInvestmentNft {
            id: object::new(ctx),
            project_id,
            name: string::utf8(name), 
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
        };

        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun transfer(nft: ProjectInvestmentNft, recipient: address) {
        transfer::transfer(nft, recipient);
    }
}