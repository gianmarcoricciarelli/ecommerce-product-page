import type { Meta, StoryObj } from '@storybook/vue3';

import ProductDescription from './ProductDescription.vue';

const meta: Meta<typeof ProductDescription> = {
    title: 'Product Description',
    component: ProductDescription,
    args: {},
    tags: ['autodocs'],
};
export default meta;

export const Desktop: StoryObj<typeof ProductDescription> = {
    decorators: [
        () => ({
            template: `<div style="width:440px;"><story/></div>`,
        }),
    ],
    args: {
        product: {
            name: 'Fall Limited Edition Sneakers',
            brand: 'Sneaker Company',
            description: `
                These low-profile sneakers are your perfect casual wear companion.
                Featuring a durable rubber outer sole, they'll withstand everything
                the weather can offer.
            `,
            price: 250,
            discount: 50,
            image: {
                src: '',
                alt: '',
            },
        },
    },
};
export const Mobile: StoryObj<typeof ProductDescription> = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
    args: {
        product: {
            name: 'Fall Limited Edition Sneakers',
            brand: 'Sneaker Company',
            description: `
                These low-profile sneakers are your perfect casual wear companion.
                Featuring a durable rubber outer sole, they'll withstand everything
                the weather can offer.
            `,
            price: 250,
            discount: 50,
            image: {
                src: '',
                alt: '',
            },
        },
    },
};
