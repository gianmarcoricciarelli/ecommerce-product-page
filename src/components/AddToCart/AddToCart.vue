<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { CartItem, Product } from '../../types/types';

    import { inject, ref } from 'vue';

    const { product } = defineProps<{ product: Product }>();

    const quantity = ref(0);

    const itemsInCart = inject<Ref<CartItem[]>>('itemsInCart', ref([]));

    const updateQuantity = (update: number): void => {
        if (quantity.value + update >= 0) {
            quantity.value += update;
        }
    };
    const addToCart = (): void => {
        if (quantity.value !== 0) {
            const itemToUpdate = itemsInCart.value.find(
                (i) => i.product.id === product.id,
            );

            if (itemToUpdate !== undefined) {
                itemToUpdate.quantity += quantity.value;
            } else {
                itemsInCart.value = [
                    ...itemsInCart.value,
                    { product, quantity: quantity.value },
                ];
            }
        }
    };
</script>

<template>
    <div class="add-to-cart">
        <div class="add-to-cart__quantity-selector">
            <svg
                width="12"
                height="4"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                @click="() => updateQuantity(-1)"
            >
                <defs>
                    <path
                        d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                        id="a"
                    />
                </defs>
                <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a" />
            </svg>
            <div>
                <p>{{ quantity }}</p>
            </div>
            <svg
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                @click="() => updateQuantity(1)"
            >
                <defs>
                    <path
                        d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                        id="b"
                    />
                </defs>
                <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b" />
            </svg>
        </div>
        <button
            class="add-to-cart__button"
            :class="{ 'add-to-cart__button-disabled': quantity === 0 }"
            @click="addToCart"
            :disabled="quantity === 0"
        >
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                    fill="currentColor"
                    fill-rule="nonzero"
                />
            </svg>
            <p>Add to cart</p>
        </button>
    </div>
</template>

<style scoped lang="scss">
    .add-to-cart {
        @include flex-container(row, flex-start, center, 1.6rem);

        width: 100%;

        &__quantity-selector {
            @include flex-container(row, flex-start, center, 2.4rem);

            background-color: $light-grayish-blue;
            padding: 0.8rem 1.2rem;
            border-radius: 0.7rem;

            div {
                width: 1.6rem;
                text-align: center;
                white-space: nowrap;

                p {
                    color: $very-dark-blue;
                    user-select: none;
                    font-weight: 700;
                }
            }

            svg {
                @include apply-opacity-on-hover;
            }
        }

        &__button {
            @include flex-container(row, center, center, 1.2rem);
            @include reset-button;
            @include apply-opacity-on-hover;

            flex-grow: 1;
            background-color: $orange;
            color: $white;
            padding: 0.8rem 1.2rem;

            p {
                font-weight: 700;
            }

            &-disabled {
                background-color: $pale-orange;

                &:hover {
                    cursor: not-allowed;
                    filter: unset;
                }
            }
        }
    }

    @media screen and (max-width: 37.5rem) {
        .add-to-cart {
            @include flex-container(column, center, center, 1.6rem);

            &__quantity-selector {
                width: 100%;
            }

            &__button {
                flex-grow: initial;
                width: 100%;
            }
        }
    }
</style>
