<script lang="ts" setup>
    const { modalIsOpen } = defineProps<{ modalIsOpen: boolean }>();

    defineEmits<(event: 'closingModal') => void>();
</script>

<template>
    <Transition name="fade">
        <div class="overlay" v-if="modalIsOpen">
            <div class="modal">
                <div class="modal__header">
                    <svg
                        width="14"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="$emit('closingModal')"
                    >
                        <path
                            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                        />
                    </svg>
                </div>
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 300ms;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }

    .overlay {
        @include width-and-height(100dvw, 100dvh);
        @include flex-container(column);

        background-color: rgba($color: $black, $alpha: 0.5);
        position: fixed;
        top: 0;
        left: 0;

        .modal {
            @include flex-container(column, center, center, 2rem);

            max-width: 25%;
            max-height: 75%;

            .modal__header {
                @include flex-container(row, flex-end);

                width: 100%;

                svg {
                    @include change-color-on-hover($very-dark-blue, $orange);
                }
            }
        }
    }
</style>
