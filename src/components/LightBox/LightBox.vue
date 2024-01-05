<script setup lang="ts">
    import type { Image } from '../../types/types';

    import { ref } from 'vue';
    import gsap from 'gsap';
    import { useDetectMobileDevice } from '../../composables/useResizeObserver';

    const { images, isRenderedInModal } = defineProps<{
        isRenderedInModal: boolean;
        images: Image[];
    }>();

    const activeImage = ref(0);
    const otherImagesContainerRef = ref<Element>();
    const activeImgIsChanging = ref(false);

    const { isMobile } = useDetectMobileDevice(document.body);

    const onClickHandler = (event: MouseEvent, index: number): void => {
        if (activeImgIsChanging.value || index === activeImage.value) {
            return;
        }

        const timeLine = gsap.timeline();

        timeLine.to('#active-img', {
            opacity: 0,
            duration: 0.3,
            onStart: () => {
                activeImgIsChanging.value = true;
            },
            onComplete: () => {
                otherImagesContainerRef.value!.querySelector('#active')!.id =
                    '';
                (event.target as Element).id = 'active';
                activeImage.value = index;
            },
        });
        timeLine.to(
            '#active-img',
            {
                opacity: 1,
                delay: 0.2,
                duration: 0.3,
                onComplete: () => {
                    activeImgIsChanging.value = false;
                },
            },
            '>',
        );
    };
    const onImgSelectorClickHandler = (nextIndex: number): void => {
        if (nextIndex > 0 && activeImage.value + nextIndex < images.length) {
            activeImage.value = activeImage.value + 1;
        } else if (nextIndex < 0 && activeImage.value + nextIndex >= 0) {
            activeImage.value = activeImage.value - 1;
        }
    };
</script>

<template>
    <div class="light-box">
        <img
            :src="images[activeImage].src"
            :alt="images[activeImage].alt"
            id="active-img"
            :class="{ 'reset-hover': isRenderedInModal }"
        />
        <div
            class="light-box__other-images"
            ref="otherImagesContainerRef"
            v-if="!isMobile"
        >
            <div v-for="({ src, alt }, index) in images" :key="src">
                <img
                    :id="index === 0 ? 'active' : ''"
                    :src="src"
                    :alt="alt"
                    @click="(event) => onClickHandler(event, index)"
                />
            </div>
        </div>
        <div
            class="light-box__selector--next"
            v-on:click="() => onImgSelectorClickHandler(1)"
            v-if="isMobile"
        >
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m2 1 8 8-8 8"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    fill-rule="evenodd"
                />
            </svg>
        </div>
        <div
            class="light-box__selector--previous"
            v-on:click="() => onImgSelectorClickHandler(-1)"
            v-if="isMobile"
        >
            <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 1 3 9l8 8"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    fill-rule="evenodd"
                />
            </svg>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .light-box {
        @include flex-container(column, space-between, flex-start, 6rem);

        img {
            border-radius: 2rem;
        }

        img:first-of-type {
            width: 100%;
        }

        &__other-images {
            @include flex-container(row, space-between, center);

            width: 100%;

            div {
                border-radius: 2rem;
                max-width: 20%;
                transition: all 300ms;

                img {
                    @include apply-opacity-on-hover;
                }
            }

            #active {
                box-shadow: 0 0 0 0.3rem $orange;

                img {
                    opacity: 50%;

                    &:hover {
                        filter: none;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 37.5rem) {
        .light-box {
            position: relative;

            img {
                &:hover {
                    cursor: default;
                    filter: unset;
                }
            }

            div {
                @include width-and-height(4rem, 4rem);

                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: $white;
                user-select: none;
                transition: all 300ms;

                &:hover {
                    cursor: pointer;
                    scale: 1.05;
                    color: $orange;
                }

                svg {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &__selector--next {
                bottom: 50%;
                left: 90% !important;
            }

            &__selector--previous {
                bottom: 50%;
                left: 10% !important;
            }
        }
    }

    .reset-hover {
        &:hover {
            cursor: default !important;
            filter: unset !important;
        }
    }
</style>
