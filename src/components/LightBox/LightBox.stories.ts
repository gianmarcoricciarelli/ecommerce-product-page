import type { Meta, StoryObj } from '@storybook/vue3';

import LightBox from './LightBox.vue';

const meta: Meta<typeof LightBox> = {
    title: 'Light Box',
    component: LightBox,
    args: {},
};
export default meta;

export const DesktopLayout: StoryObj<typeof LightBox> = {
    args: {
        images: [
            'image-product-1.jpg',
            'image-product-2.jpg',
            'image-product-3.jpg',
            'image-product-4.jpg',
        ],
    },
    decorators: [
        () => ({
            template:
                '<div id="the-decorator" style="width: 500px;"><story/></div>',
        }),
    ],
};
export const MobileLayout: StoryObj<typeof LightBox> = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
