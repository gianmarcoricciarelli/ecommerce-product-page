import type { Meta, StoryObj } from '@storybook/vue3';

import SectionList from './SectionsList.vue';

const meta: Meta<typeof SectionList> = {
    title: 'Sections List',
    component: SectionList,
    args: {},
    tags: ['autodocs'],
};
export default meta;

export const Desktop: StoryObj<typeof SectionList> = {
    args: {
        sections: ['Collections', 'Men', 'Women', 'About', 'Contact'],
        isMobile: false,
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
        isMobile: true,
    },
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
