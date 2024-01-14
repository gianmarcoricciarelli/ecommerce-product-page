<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { CartItem } from '../../../types/types';

    import { inject, ref } from 'vue';

    const { item } = defineProps<{ item: CartItem }>();

    const itemsInCart = inject<Ref<CartItem[]>>('itemsInCart', ref([]));

    const onTrashIconClick = (): void => {
        itemsInCart.value = itemsInCart.value.filter(
            (itemInCart) => itemInCart.product.id !== item.product.id,
        );
    };
</script>

<template>
    <div class="item">
        <img :src="item.product.image.src" :alt="item.product.image.alt" />
        <div class="item__description-and-price">
            <p>{{ item.product.name }}</p>
            <div>
                <p>
                    {{ `$${item.product.price} x ${item.quantity}` }}
                    <span class="total_price">{{
                        `$${item.product.price * item.quantity}`
                    }}</span>
                </p>
            </div>
        </div>
        <svg
            width="14"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            @click="onTrashIconClick"
        >
            <defs>
                <path
                    d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                    id="a"
                />
            </defs>
            <use fill="currentColor" fill-rule="nonzero" xlink:href="#a" />
        </svg>
    </div>
</template>

<style scoped lang="scss">
    .item {
        @include flex-container(none, flex-start, center, 1.2rem);

        width: 100%;

        img {
            @include width-and-height(5rem, 5rem);
            border-radius: 0.7rem;
        }

        svg {
            @include change-color-on-hover($grayish-blue, $dark-grayish-blue);
        }

        &__description-and-price {
            flex-grow: 1;

            p {
                color: $dark-grayish-blue;
            }

            .total_price {
                font-weight: 700;
                color: $very-dark-blue;
            }
        }
    }
</style>
