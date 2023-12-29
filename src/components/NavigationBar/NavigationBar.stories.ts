import type { Meta, StoryObj } from '@storybook/vue3';

import NavigationBar from './NavigationBar.vue';

const meta: Meta<typeof NavigationBar> = {
    title: 'Navigation Bar',
    component: NavigationBar,
    args: {},
    // tags: ["autodocs"],
};
export default meta;

export const Desktop: StoryObj<typeof NavigationBar> = {
    decorators: [
        () => ({ template: `<div style="width:750px"><story/></div>` }),
    ],
};
export const Mobile: StoryObj<typeof NavigationBar> = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
