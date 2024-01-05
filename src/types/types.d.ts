export interface Image {
    src: string;
    alt: string;
}

export interface Product {
    name: string;
    brand: string;
    description: string;
    price: number;
    image: Image;
    discount?: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
