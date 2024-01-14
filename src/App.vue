<script setup lang="ts">
    import type { CartItem, Image, Product } from './types/types';

    import { provide, ref } from 'vue';
    import AddToCart from './components/AddToCart/AddToCart.vue';
    import LightBox from './components/LightBox/LightBox.vue';
    import Modal from './components/Modal/Modal.vue';
    import NavigationBar from './components/NavigationBar/NavigationBar.vue';
    import ProductDescription from './components/ProductDescription/ProductDescription.vue';
    import { useDetectMobileDevice } from './composables/useResizeObserver';

    const itemsInCart = ref<CartItem[]>([]);
    const modalIsOpen = ref(false);
    const activeImageIdx = ref(0);

    const { isMobile } = useDetectMobileDevice(document.body);

    provide('isMobile', isMobile.value);
    provide('itemsInCart', itemsInCart);

    const images: Image[] = [
        { src: 'image-product-1.jpg', alt: 'Product 1' },
        { src: 'image-product-2.jpg', alt: 'Product 2' },
        { src: 'image-product-3.jpg', alt: 'Product 3' },
        { src: 'image-product-4.jpg', alt: 'Product 4' },
    ];
    const product: Product = {
        id: 1,
        name: 'Fall Limited Edition Sneakers',
        brand: 'Sneaker Company',
        description: `
                These low-profile sneakers are your perfect casual wear companion.
                Featuring a durable rubber outer sole, they'll withstand everything
                the weather can offer.
            `,
        price: 250,
        discount: 50,
        image: {
            alt: 'Product 1',
            src: 'image-product-1.jpg',
        },
    };
</script>

<template>
    <div class="ecommerce">
        <div class="navbar-container">
            <NavigationBar></NavigationBar>
        </div>
        <div class="product-section">
            <div class="lightbox-container">
                <LightBox
                    :images="[...images]"
                    @open-modal="modalIsOpen = true"
                    @selected-image="
                        (selectedImageIdx) =>
                            (activeImageIdx = selectedImageIdx)
                    "
                ></LightBox>
            </div>
            <div class="description-container">
                <ProductDescription :product="product"></ProductDescription>
                <AddToCart :product="product"></AddToCart>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Modal
            :modal-is-open="modalIsOpen"
            @closing-modal="modalIsOpen = false"
        >
            <LightBox
                :images="[...images]"
                :active-image-idx="activeImageIdx"
                :is-rendered-in-modal="true"
            ></LightBox>
        </Modal>
    </Teleport>
</template>

<style scoped lang="scss">
    .ecommerce {
        @include width-and-height(100%, 100%);

        padding: 8rem 16rem;

        .navbar-container {
            @include width-and-height(100%, 8rem);
        }

        .product-section {
            @include width-and-height(100%, 100%);
            @include flex-container(row, flex-start, flex-start);

            padding: 12rem 8rem;

            .lightbox-container {
                @include width-and-height(50%, 100%);
            }

            .description-container {
                @include flex-container(column, flex-start, flex-start, 4rem);

                width: 50%;
                padding: 8rem 12rem;
            }
        }
    }
</style>
