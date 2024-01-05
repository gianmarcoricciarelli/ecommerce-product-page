import type { Meta, StoryObj } from '@storybook/vue3';

import SectionList from './SectionsList.vue';
import { provide } from 'vue';

const meta: Meta<typeof SectionList> = {
    title: 'Sections List',
    component: SectionList,
    args: {
        sections: ['Collections', 'Men', 'Women', 'About', 'Contact'],
    },
    tags: ['autodocs'],
};
export default meta;

export const Desktop: StoryObj<typeof SectionList> = {
    decorators: [
        () => ({
            template:
                '<div id="the-decorator" style="width: 500px; height: 50px"><story/></div>',
        }),
    ],
    render: (args) => ({
        components: { SectionList },
        setup() {
            provide('isMobile', false);

            return { args };
        },
        template: '<SectionList v-bind="args" />',
    }),
};
export const Mobile: StoryObj<typeof SectionList> = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
    render: (args) => ({
        components: { SectionList },
        setup() {
            provide('isMobile', true);

            return { args };
        },
        template: '<SectionList v-bind="args" />',
    }),
};
