import type { Meta, StoryObj } from '@storybook/vue3';

import NavigationBar from './NavigationBar.vue';
import { provide } from 'vue';

const meta: Meta<typeof NavigationBar> = {
    title: 'Navigation Bar',
    component: NavigationBar,
};
export default meta;

export const Desktop: StoryObj<typeof NavigationBar> = {
    decorators: [
        () => ({
            template: `<div style="width:760px; height: 250px"><story/></div>`,
        }),
    ],
    render: (args) => ({
        components: { NavigationBar },
        setup() {
            provide('isMobile', false);

            return { args };
        },
        template: '<NavigationBar :v-bind="args"/>',
    }),
};
export const Mobile: StoryObj<typeof NavigationBar> = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
    render: (args) => ({
        components: { NavigationBar },
        setup() {
            provide('isMobile', true);

            return { args };
        },
        template: '<NavigationBar :v-bind="args"/>',
    }),
};
