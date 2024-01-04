import type { Meta, StoryObj } from '@storybook/vue3';

import Cart from './Cart.vue';

const meta: Meta<typeof Cart> = {
    title: 'Cart',
    component: Cart,
    args: { items: [] },
    tags: ['autodocs'],
};
export default meta;

export const Empty: StoryObj<typeof Cart> = {};
export const Full: StoryObj<typeof Cart> = {
    args: {
        items: [
            {
                product: {
                    name: 'Product Name',
                    brand: 'Product Brand',
                    description: 'Product Description',
                    price: 100,
                },
                price: 100,
                quantity: 2,
                image: {
                    src: 'image-product-1-thumbnail.jpg',
                    alt: 'Cart Item',
                },
            },
        ],
    },
};
