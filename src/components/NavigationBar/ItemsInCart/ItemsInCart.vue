<script setup lang="ts">
    const { totalItemsInCart } = defineProps<{ totalItemsInCart: number }>();
</script>

<template>
    <Transition>
        <div class="items-in-cart" v-if="totalItemsInCart > 0">
            <span>{{ totalItemsInCart }}</span>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
    .v-enter-from {
        opacity: 0;
        transform: translateY(-1.2rem);
    }

    .v-enter-to {
        opacity: 1;
        transform: translateY(-0.4rem);
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
        transition: all linear 300ms;

        span {
            display: inline-block;
            color: $white;
            font-size: 8px;
            line-height: unset;
        }
    }
</style>
