<script lang="ts" setup>
    defineEmits<{ (event: 'closingModal', modalIsClosed: boolean): void }>();
</script>

<template>
    <div class="overlay">
        <div class="modal">
            <div class="modal__header">
                <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="$emit('closingModal', true)"
                >
                    <path
                        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                    />
                </svg>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .overlay {
        @include width-and-height(100dvw, 100dvh);
        @include flex-container(column);

        background-color: rgba($color: $black, $alpha: 0.5);
        position: fixed;
        top: 0;
        left: 0;

        .modal {
            @include flex-container(column, center, center, 2rem);

            max-width: 30dvw;
            max-height: 30dvh;

            .modal__header {
                @include flex-container(row, flex-end);

                width: 100%;

                svg {
                    @include from-color-to-color-on-hover(
                        $very-dark-blue,
                        $orange
                    );
                }
            }
        }
    }
</style>
