import type { Preview } from '@storybook/vue3';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/style.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'centered',
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};

export default preview;
