import type { Meta, StoryObj } from '@storybook/vue3';

import AddToCart from './AddToCart.vue';

const meta: Meta<typeof AddToCart> = {
    title: 'Add To Cart',
    component: AddToCart,
};
export default meta;

export const Desktop: StoryObj<typeof AddToCart> = {
    decorators: [
        () => ({
            template:
                '<div id="the-decorator" style="width: 500px;"><story/></div>',
        }),
    ],
};
export const Mobile: StoryObj<typeof AddToCart> = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
