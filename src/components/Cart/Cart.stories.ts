import type { Meta, StoryObj } from "@storybook/vue3";

import Cart from "./Cart.vue";

const meta: Meta<typeof Cart> = {
    title: "Cart",
    component: Cart,
    args: { items: [] },
    tags: ["autodocs"],
};
export default meta;

export const EmptyCart: StoryObj<typeof Cart> = {};
export const FullCart: StoryObj<typeof Cart> = {
    args: {
        items: [
            {
                name: "Product Name",
                price: 100,
                quantity: 2,
                imageUrl: "image-product-1-thumbnail.jpg",
            },
        ],
    },
};
