const products = [
    {
        id: 7,
        image: 'bear-1.webp',
        name: 'Mutate Bear 1',
        brand: 'Mutate Bears',
        description: 'Meet the Frens',
        about: 'Loved for their inventive, imaginative approach to problem-solving, Capybaras are relentless tinkerers.',
        quantity: 70,
        rating: 4,
        discount: 16,
        offerPrice: 1400,
        gender: 'male',
        categories: ['electronics', 'laptop'],
        colors: ['errorDark', 'secondaryMain', 'errorMain'],
        popularity: 8064416241156096,
        date: 8404918872309760,
        created: '2023-09-14T11:06:37.086Z',
        isStock: true,
        new: 30
    },
    {
        id: 4,
        image: 'bear-2.webp',
        name: 'Mutate Bear 1',
        brand: 'Mutate Bears',
        offer: '20%',
        description: 'Meet the Frens',
        about: 'This product from Centrix is a classic choice who love classical products. It it made of pure gold and weighs around 50 grams',
        quantity: 3,
        rating: 4,
        discount: 20,
        salePrice: 360,
        offerPrice: 290,
        gender: 'kids',
        categories: ['fashion', 'watch'],
        colors: ['errorLight', 'warningMain'],
        popularity: 5371542787588096,
        date: 7896440806309888,
        created: '2023-08-24T02:26:37.086Z',
        isStock: true,
        new: 15
    },
    {
        id: 5,
        image: 'capy-1.svg',
        name: 'Suifrens Capys V2',
        brand: 'Suifrens',
        offer: '30%',
        description: 'Loved for their inventive, imaginative approach to problem-solving, Capybaras are relentless tinkerers.',
        about: 'Loved for their inventive, imaginative approach to problem-solving, Capybaras are relentless tinkerers.',
        quantity: 50,
        rating: 3.5,
        discount: 15,
        salePrice: 150,
        offerPrice: 120,
        gender: 'male',
        categories: ['electronics', 'camera'],
        colors: ['warningMain', 'primary200'],
        popularity: 7567566262239232,
        date: 2343240212676608,
        created: '2023-08-28T23:26:37.086Z',
        isStock: true,
        new: 25
    },
    {
        id: 3,
        image: 'capy-2.svg',
        name: 'Mutate Bear 2',
        brand: 'Mutate Bear',
        offer: '30%',
        description: 'Loved for their inventive, imaginative approach to problem-solving, Capybaras are relentless tinkerers.',
        about: 'Loved for their inventive, imaginative approach to problem-solving, Capybaras are relentless tinkerers.',
        quantity: 70,
        rating: 4.5,
        discount: 40,
        salePrice: 85,
        offerPrice: 49,
        gender: 'male',
        categories: ['fashion', 'watch'],
        colors: ['primary200', 'primaryDark'],
        popularity: 4630912228655104,
        date: 2554435171516416,
        created: '2023-08-26T23:21:37.086Z',
        isStock: true,
        new: 35
    },
    {
        id: 8,
        image: 'fuddies-1.png',
        name: 'Fuddie 1',
        brand: 'Fuddies',
        description: 'FUD around and find out',
        about: 'NFT FUDDIES is a collection of terms from the NFT space displayed in a fun way, mint first!',
        quantity: 21,
        rating: 4.5,
        discount: 30,
        salePrice: 129,
        offerPrice: 100,
        gender: 'female',
        categories: ['electronics', 'iphone'],
        colors: ['errorMain', 'successDark'],
        popularity: 4917679785771008,
        date: 7340399240675328,
        created: '2023-08-30T22:01:37.086Z',
        isStock: true,
        new: 20
    },
    {
        id: 1,
        image: 'fuddies-2.png',
        name: 'Fuddie 2',
        brand: 'Fuddie',
        description: 'FUD around and find out',
        about: 'NFT FUDDIES is a collection of terms from the NFT space displayed in a fun way, mint first!',
        quantity: 3,
        rating: 4,
        discount: 75,
        offerPrice: 275,
        gender: 'male',
        categories: ['fashion', 'watch'],
        colors: ['errorDark', 'errorMain', 'secondaryMain'],
        popularity: 5182338812084224,
        date: 6930768506912768,
        created: '2023-08-23T02:51:37.085Z',
        isStock: true,
        new: 45
    },
    {
        id: 9,
        image: 'gommies-1.png',
        name: 'Gommies 1',
        brand: 'Gommies',
        description:
            'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        about: 'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        quantity: 21,
        rating: 4,
        discount: 5,
        offerPrice: 399,
        gender: 'female',
        categories: ['electronics', 'camera'],
        colors: ['errorMain', 'successDark'],
        popularity: 3513367186636800,
        date: 8118657112604672,
        created: '2023-08-30T22:01:37.086Z',
        isStock: true,
        new: 10
    },
    {
        id: 10,
        image: 'gommies-2.png',
        name: 'Gommies 2',
        brand: 'Gommies',
        description:
            'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        about: 'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        quantity: 21,
        rating: 4,
        discount: 5,
        offerPrice: 399,
        gender: 'female',
        categories: ['electronics', 'camera'],
        colors: ['errorMain', 'successDark'],
        popularity: 3513367186636800,
        date: 8118657112604672,
        created: '2023-08-30T22:01:37.086Z',
        isStock: true,
        new: 10
    },
    {
        id: 11,
        image: 'gommies-3.png',
        name: 'Gommies 3',
        brand: 'Gommies',
        description:
            'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        about: 'Gommies is more than just an NFT project. Its a movement that is redefining the way we think about digital collectibles.',
        quantity: 21,
        rating: 4,
        discount: 5,
        offerPrice: 399,
        gender: 'female',
        categories: ['electronics', 'camera'],
        colors: ['errorMain', 'successDark'],
        popularity: 3513367186636800,
        date: 8118657112604672,
        created: '2023-08-30T22:01:37.086Z',
        isStock: true,
        new: 10
    },
    {
        id: 2,
        image: 'bullshark-1.svg',
        name: 'Bullshark 1',
        brand: 'Suifrens',
        description: 'Famous for their speed, strength, and determination Bullsharks thrive in Sui’s blockchain ocean.',
        about: 'Famous for their speed, strength, and determination Bullsharks thrive in Sui’s blockchain ocean. Their leadership and strategy skills serve as the consensus engine that brings order to the community.',
        quantity: 45,
        rating: 3.5,
        discount: 10,
        offerPrice: 81,
        gender: 'kids',
        categories: ['electronics', 'headphones'],
        colors: ['primary200', 'successLight', 'secondary200', 'warningMain'],
        popularity: 7492358373376000,
        date: 2884216050155520,
        created: '2023-08-21T00:02:37.086Z',
        isStock: false,
        new: 40
    },
    {
        id: 6,
        image: 'bullshark-2.svg',
        name: 'Bullshark 2',
        brand: 'Suifrens',
        offer: '70%',
        description: 'Famous for their speed, strength, and determination Bullsharks thrive in Sui’s blockchain ocean.',
        about: 'Famous for their speed, strength, and determination Bullsharks thrive in Sui’s blockchain ocean. Their leadership and strategy skills serve as the consensus engine that brings order to the community.',
        quantity: 40,
        rating: 4.5,
        discount: 10,
        offerPrice: 86,
        gender: 'female',
        categories: ['electronics', 'iphone'],
        colors: ['primaryDark'],
        popularity: 771944976744448,
        date: 6502451955892224,
        created: '2023-09-06T19:11:37.086Z',
        isStock: true,
        new: 15
    }
];

// create function that gets product from products var by its id
const getProductMockById = (productId) => {
    const product = products.filter((p) => p.id == productId);

    if (!product || product.length === 0) {
        return {};
    }

    return product[0];
};

export default products;

export { getProductMockById };