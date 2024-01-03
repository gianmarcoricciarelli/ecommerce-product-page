export interface Image {
    src: string;
    alt: string;
}

export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: Image;
}
