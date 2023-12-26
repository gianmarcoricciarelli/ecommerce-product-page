import type { Meta, StoryObj } from "@storybook/vue3";

import NavigationBar from "./NavigationBar.vue";

const meta: Meta<typeof NavigationBar> = {
    title: "Navigation Bar",
    component: NavigationBar,
    args: {},
    // tags: ["autodocs"],
};
export default meta;

export const DesktopLayout: StoryObj<typeof NavigationBar> = {
    parameters: {
        layout: "fullscreen",
    },
};
export const MobileLayout: StoryObj<typeof NavigationBar> = {
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "iphonex",
        },
    },
};
