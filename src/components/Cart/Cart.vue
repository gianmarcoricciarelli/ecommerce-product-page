<script setup lang="ts">
    import type { CartItem } from '../../types/types';
    import Item from './Item/Item.vue';

    defineProps<{ items: CartItem[] }>();

    function onCheckoutButtonClickHandler(): void {
        console.log('hello');
    }
</script>

<template>
    <div class="cart">
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
                <button @click="onCheckoutButtonClickHandler">Checkout</button>
            </div>
            <p v-else>Your cart is empty.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cart {
        @include width-and-height(35rem, 26rem);
        @include flex-container(column, center, center);

        background-color: $white;
        padding: 2rem 0rem 2.8rem 0rem;
        border-radius: 0.7rem;

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
                    @include opacity-on-hover(70%);

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
