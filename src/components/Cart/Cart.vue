<script setup lang="ts">
    import type { CartItem } from '../../types/types';

    import { onMounted, onUnmounted } from 'vue';
    import Item from './Item/Item.vue';

    const props = defineProps<{
        items: CartItem[];
        cartIsOpen: boolean;
    }>();

    const emit =
        defineEmits<
            (
                event: 'clickOnDomElement',
                clickedElement: EventTarget | null,
            ) => void
        >();

    function onCheckoutButtonClickHandler(): void {
        console.log('CHECKOUT');
    }

    const onDomClickHandler = (event: MouseEvent): void => {
        emit('clickOnDomElement', event.target);
    };

    onMounted(() => {
        document.addEventListener('click', onDomClickHandler);
    });

    onUnmounted(() => {
        document.removeEventListener('click', onDomClickHandler);
    });
</script>

<template>
    <Transition>
        <div v-if="props.cartIsOpen" class="cart">
            <div class="cart__header">
                <p>Cart</p>
            </div>
            <div class="cart__content">
                <div class="content__container" v-if="props.items.length !== 0">
                    <Item
                        v-for="(item, index) in props.items"
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
    </Transition>
</template>

<style lang="scss" scoped>
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .v-enter-to,
    .v-leave-from {
        opacity: 1;
    }

    .cart {
        @include width-and-height(35rem, 26rem);
        @include flex-container(column, center, center);

        background-color: $white;
        padding: 2rem 0rem 2.8rem 0rem;
        border-radius: 0.7rem;
        position: absolute;
        right: 0;
        top: 6rem;
        box-shadow: 0px 8px 24px 0px $grayish-blue;
        transition: all linear 300ms;

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

    @media screen and (max-width: 37.5rem) {
        .cart {
            right: unset;
            left: 50%;
            transform: translateX(-90%);
        }
    }
</style>
