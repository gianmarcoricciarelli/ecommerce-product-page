import type { Meta, StoryObj } from '@storybook/vue3';

import LightBox from './LightBox.vue';

const meta: Meta<typeof LightBox> = {
    title: 'Light Box',
    component: LightBox,
    args: {},
};
export default meta;

export const Desktop: StoryObj<typeof LightBox> = {
    args: {
        images: [
            { src: 'image-product-1.jpg', alt: 'Product 1' },
            { src: 'image-product-2.jpg', alt: 'Product 2' },
            { src: 'image-product-3.jpg', alt: 'Product 3' },
            { src: 'image-product-4.jpg', alt: 'Product 4' },
        ],
    },
    decorators: [
        () => ({
            template:
                '<div id="the-decorator" style="width: 500px;"><story/></div>',
        }),
    ],
};
export const Mobile: StoryObj<typeof LightBox> = {
    args: {
        images: [
            { src: 'image-product-1.jpg', alt: 'Product 1' },
            { src: 'image-product-2.jpg', alt: 'Product 2' },
            { src: 'image-product-3.jpg', alt: 'Product 3' },
            { src: 'image-product-4.jpg', alt: 'Product 4' },
        ],
    },
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
