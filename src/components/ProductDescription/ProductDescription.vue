<script setup lang="ts">
    import type { Product } from '../../types/types';

    defineProps<{ product: Product }>();

    const getDiscountedPrice = (price: number, discount: number): number => {
        return price - (price / discount) * 100;
    };
</script>

<template>
    <div class="product-description">
        <div class="product-description__name">
            <p>{{ product.name }}</p>
        </div>
        <div class="product-description__type">
            <p>{{ product.type }}</p>
        </div>
        <div class="product-description__description">
            <p>{{ product.description }}</p>
        </div>
        <div class="product-description__prince-and-discount">
            <div class="prince-and-discount">
                <p>
                    {{
                        product.discount
                            ? getDiscountedPrice(
                                  product.price,
                                  product.discount,
                              )
                            : product.price
                    }}
                </p>
                <p v-if="product.discount">{{ `${product.discount}%` }}</p>
            </div>
            <p v-if="product.discount">{{ product.price }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .product-description {
        @include width-and-height(100%, 100%);
        @include flex-container(column, flex-start, flex-start, 2rem);

        &__type {
            p {
                font-weight: 700;
                color: $orange;
            }
        }

        &__type {
            p {
                color: $very-dark-blue;
            }
        }

        &__prince-and-discount {
            @include flex-container(row, space-between, center);
        }
    }
</style>
