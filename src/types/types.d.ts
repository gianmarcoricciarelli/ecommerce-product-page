export interface Product {
    name: string;
    type: string;
    description: string;
    price: number;
    discount?: number;
}

export interface Image {
    src: string;
    alt: string;
}

export interface CartItem {
    product: Product;
    price: number;
    quantity: number;
    image: Image;
}
