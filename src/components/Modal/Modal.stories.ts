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
                    :is-rendered-in-modal="true"
                    :images: [
                        { src: 'image-product-1.jpg', alt: 'Product 1' },
                        { src: 'image-product-2.jpg', alt: 'Product 2' },
                        { src: 'image-product-3.jpg', alt: 'Product 3' },
                        { src: 'image-product-4.jpg', alt: 'Product 4' },
                    ],
                />
            </Modal>
        `,
    }),
};
