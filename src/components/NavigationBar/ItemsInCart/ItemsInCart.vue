<script setup lang="ts">
    const { totalItemsInCart } = defineProps<{ totalItemsInCart: number }>();
</script>

<template>
    <Transition name="fade-and-slide">
        <div class="items-in-cart" v-if="totalItemsInCart > 0">
            <span>{{ totalItemsInCart }}</span>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
    .fade-and-slide-enter-from {
        opacity: 0;
        top: -1.2rem;
    }

    .fade-and-slide-enter-active {
        transition: all 3s;
    }

    .fade-and-slide-enter-to {
        opacity: 1;
    }

    .items-in-cart {
        @include width-and-height(1.2rem, 1.2rem);
        @include flex-container(row, center, center);

        position: absolute;
        background-color: $orange;
        border-radius: 50%;
        text-align: center;
        top: -0.4rem;
        left: 1.2rem;

        span {
            display: inline-block;
            color: $white;
            font-size: 8px;
            line-height: unset;
        }
    }
</style>
