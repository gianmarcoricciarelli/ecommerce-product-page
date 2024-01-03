export interface Image {
    readonly src: string;
    readonly alt: string;
}

export interface CartItem {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    image: Image;
}
