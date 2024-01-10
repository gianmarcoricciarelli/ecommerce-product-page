<script setup lang="ts">
    import type { Ref, UnwrapRef } from 'vue';
    import type { CartItem } from '../../types/types';

    import { onMounted, onUnmounted, ref } from 'vue';
    import Item from './Item/Item.vue';
    import gsap from 'gsap';

    const { items } = defineProps<{ items: CartItem[] }>();

    const emit =
        defineEmits<
            (
                event: 'userClickedSomewhere',
                clickEvent: MouseEvent,
                cartContainerRef: UnwrapRef<Ref<HTMLDivElement | null>>,
            ) => void
        >();

    const cartContainerRef = ref<HTMLDivElement | null>(null);

    const isClickInside = (event: MouseEvent): void => {
        emit('userClickedSomewhere', event, cartContainerRef.value);
    };

    onMounted(() => {
        gsap.to('.cart', {
            opacity: 1,
            top: '6rem',
            duration: 0.3,
        });

        document.addEventListener('click', isClickInside);
    });

    onUnmounted(() => {
        document.removeEventListener('click', isClickInside);
    });

    function onCheckoutButtonClickHandler(): void {
        console.log('hello');
    }
</script>

<template>
    <Teleport to=".inner-container__cart-and-account">
        <div class="cart" ref="cartContainerRef">
            <div class="cart__header">
                <p>Cart</p>
            </div>
            <div class="cart__content">
                <div class="content__container" v-if="items.length !== 0">
                    <Item
                        v-for="(item, index) in items"
                        :key="index"
                        :item="item"
                    />
                    <button @click="onCheckoutButtonClickHandler">
                        Checkout
                    </button>
                </div>
                <p v-else>Your cart is empty.</p>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
    .cart {
        @include width-and-height(35rem, 26rem);
        @include flex-container(column, center, center);

        background-color: $white;
        padding: 2rem 0rem 2.8rem 0rem;
        border-radius: 0.7rem;
        position: absolute;
        right: 0;
        top: 8rem;
        box-shadow: 0px 8px 24px 0px $grayish-blue;
        opacity: 0;

        &__header {
            @include width-and-height(100%, 5rem);

            border-bottom: 1px solid $grayish-blue;
            padding: 0rem 2.4rem;

            p {
                font-weight: 700;
                color: $very-dark-blue;
            }
        }

        &__content {
            @include flex-container();

            width: 100%;
            padding: 0rem 2.4rem;
            padding-top: 1.6rem;
            flex-grow: 1;
            overflow-y: auto;

            & > p:first-of-type {
                font-weight: 700;
                color: $dark-grayish-blue;
            }

            .content__container {
                @include width-and-height(100%, 100%);
                @include flex-container(column, space-between, flex-start);

                button {
                    @include width-and-height(100%, 5.6rem);
                    @include apply-opacity-on-hover(70%);

                    border: unset;
                    border-radius: 0.7rem;
                    background-color: $orange;
                    color: $white;
                    font-weight: 700;
                }
            }
        }
    }
</style>
