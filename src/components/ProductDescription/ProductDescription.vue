<script setup lang="ts">
    import type { Product } from '../../types/types';

    defineProps<{ product: Product }>();

    const getDiscountedPrice = (price: number, discount: number): number => {
        return (price - (price * discount) / 100).toFixed(2);
    };
</script>

<template>
    <div class="product-description">
        <div class="product-description__brand">
            <h5>{{ product.brand.toUpperCase() }}</h5>
        </div>
        <div class="product-description__name">
            <h1>{{ product.name }}</h1>
        </div>
        <div class="product-description__description">
            <p>{{ product.description }}</p>
        </div>
        <div class="product-description__prince-and-discount">
            <div class="prince-and-discount-badge">
                <h1>
                    {{
                        `$${
                            product.discount
                                ? getDiscountedPrice(
                                      product.price,
                                      product.discount,
                                  )
                                : product.price.toFixed(2)
                        }`
                    }}
                </h1>
                <div class="discount-badge" v-if="product.discount">
                    <p>{{ `${product.discount}%` }}</p>
                </div>
            </div>
            <p v-if="product.discount">{{ `$${product.price.toFixed(2)}` }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .product-description {
        @include width-and-height(100%, 100%);
        @include flex-container(column, flex-start, flex-start, 2rem);

        background-color: $white;

        h5 {
            font-weight: 700;
            color: $orange;
        }

        &__name {
            h1 {
                color: $very-dark-blue;
            }
        }

        &__description {
            p {
                color: $dark-grayish-blue;
            }
        }

        &__prince-and-discount {
            @include flex-container(column, flex-start, flex-start);

            h1 {
                color: $very-dark-blue;
            }

            p {
                color: $dark-grayish-blue;
                font-weight: 700;
                text-decoration-line: line-through;
            }

            .prince-and-discount-badge {
                @include flex-container(row, flex-start, center, 2rem);

                p {
                    color: $very-dark-blue;
                }

                .discount-badge {
                    background-color: $pale-orange;
                    padding: 0 0.8rem;
                    border-radius: 7px;

                    p {
                        color: $orange;
                        font-weight: 700;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 37.5rem) {
        .product-description__prince-and-discount {
            @include flex-container(row, space-between, center);

            width: 100%;
        }
    }
</style>
