import type { Meta, StoryObj } from '@storybook/vue3';

import Modal from './Modal.vue';
import LightBox from '../LightBox/LightBox.vue';

const meta: Meta<typeof Modal> = {
    title: 'Modal',
    component: Modal,
    args: {},
};
export default meta;

export const Desktop: StoryObj<typeof Modal> = {
    render: () => ({
        components: { Modal, LightBox },
        template: `
            <Modal>
                <LightBox
                    :images="[
                        'image-product-1.jpg',
                        'image-product-2.jpg',
                        'image-product-3.jpg',
                        'image-product-4.jpg'
                    ]"
                />
            </Modal>
        `,
    }),
};
