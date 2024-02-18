<script setup lang="ts">
    import gsap from 'gsap';
    import { ref, watch } from 'vue';

    defineProps<{ isOpen: boolean }>();
    defineEmits<
        (event: 'closingSideMenu', sideMenuIsClosed: boolean) => void
    >();

    const panelRef = ref<Element>();

    watch(panelRef, (newValue) => {
        if (newValue !== null) {
            const timeLine = gsap.timeline();
            timeLine.to('.side-menu', {
                backgroundColor: 'rgba($color: $black, $alpha: 0.5)',
                duration: 0.3,
            });
            timeLine.to('.side-menu__panel', { left: 0, duration: 0.5 });
        }
    });
</script>

<template>
    <Transition>
        <div class="side-menu" v-if="isOpen">
            <div class="side-menu__panel" ref="panelRef">
                <div class="header">
                    <svg
                        width="14"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="$emit('closingSideMenu', true)"
                    >
                        <path
                            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                        />
                    </svg>
                </div>
                <div class="content">
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .v-enter-to,
    .v-leave-from {
        opacity: 1;
    }

    .side-menu {
        @include width-and-height(100dvw, 100dvh);
        @include flex-container(row, flex-start, flex-start);

        background-color: rgba($color: $black, $alpha: 0.5);
        transition: all ease-in-out 300ms;
        position: relative;

        &__panel {
            @include width-and-height(70%, 100%);
            @include flex-container(column, flex-start, flex-start, 4rem);

            background-color: $white;
            position: absolute;
            left: -26.5rem;

            .header {
                width: 100%;
                padding: 2.4rem 0rem 0rem 2.8rem;

                svg {
                    @include change-color-on-hover($dark-grayish-blue, $orange);
                }
            }

            .content {
                width: 100%;
                flex-grow: 1;
            }
        }
    }
</style>
