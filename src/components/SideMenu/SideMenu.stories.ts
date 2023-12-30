import type { Meta, StoryObj } from '@storybook/vue3';

import SideMenu from './SideMenu.vue';
import SectionsList from '../SectionsList/SectionsList.vue';

const meta: Meta<typeof SideMenu> = {
    title: 'Side Menu',
    component: SideMenu,
    args: {},
};
export default meta;

export const Desktop: StoryObj<typeof SideMenu> = {
    render: () => ({
        components: { SideMenu, SectionsList },
        template: `
            <SideMenu>
                <SectionsList
                    :is-mobile="true"
                    :sections="['Collections', 'Men', 'Women', 'About', 'Contact']"
                />
            </SideMenu>
        `,
    }),
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
