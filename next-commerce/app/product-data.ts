export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

export const products: Product[] = [{
    id: '123',
    name: 'Cap',
    imageUrl: 'cap.png',
    description: 'Cheer the team on in style with our unstructured, low crown, six-panel baseball cap made of 100% organic cotton twill. Featuring our original Big Star Collectibles artwork, screen-printed with PVC- and phthalate-free inks. Complete with matching sewn ventilation eyelets, and adjustable fabric closure.',
    price: 29,
}, {
    id: '234',
    name: 'Mug',
    imageUrl: 'mug.png',
    description: 'Enjoy your morning coffee or tea in the company of your favorite Big Star Collectible character. Our strong ceramic mug, with its comfortable D-shaped handle, is microwave and dishwasher safe, and available in one size: 11 oz (3.2” diameter x 3.8” h).',
    price: 16,
}, {
    id: '345',
    name: 'Shirt',
    imageUrl: 't-shirt.png',
    description: 'Our t-shirts are made from ring-spun, long-staple organic cotton that\'s ethically sourced from member farms of local organic cotton cooperatives. Original artwork is screen-printed using PVC- and phthalate-free inks. Features crew-neck styling, shoulder-to-shoulder taping, and a buttery soft feel. Machine-wash warm, tumble-dry low.',
    price: 26,
}, {
    id: '456',
    name: 'Back Cover',
    imageUrl: 'back-cover.png',
    description: 'Protect your phone in style with our eco-friendly Big Star Collectibles Phone Back Cover, crafted from 70% recycled polycarbonate and 30% biodegradable materials. Featuring your favorite Big Star Collectibles design, this durable yet lightweight case is printed with non-toxic, fade-resistant inks, ensuring long-lasting vibrancy without harming the planet.',
    price: 24,
}];