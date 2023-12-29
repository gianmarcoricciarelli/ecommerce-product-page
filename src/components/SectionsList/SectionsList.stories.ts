import type { Meta, StoryObj } from '@storybook/vue3';

import SectionList from './SectionsList.vue';

const meta: Meta<typeof SectionList> = {
    title: 'Sections List',
    component: SectionList,
    args: {},
};
export default meta;

export const Desktop: StoryObj<typeof SectionList> = {
    args: {
        sections: ['Collections', 'Men', 'Women', 'About', 'Contact'],
    },
    decorators: [
        () => ({
            template:
                '<div id="the-decorator" style="width: 500px; height: 50px"><story/></div>',
        }),
    ],
};
export const Mobile: StoryObj<typeof SectionList> = {
    args: {
        sections: ['Collections', 'Men', 'Women', 'About', 'Contact'],
    },
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
