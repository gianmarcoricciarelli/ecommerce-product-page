<script setup lang="ts">
    import type { Image } from '../../types/types';

    import gsap from 'gsap';
    import { inject, ref } from 'vue';

    const {
        images,
        activeImageIdx = 0,
        isRenderedInModal = false,
    } = defineProps<{
        images: Image[];
        activeImageIdx?: number;
        isRenderedInModal?: boolean;
    }>();
    defineEmits<{
        (event: 'openModal'): void;
        (event: 'selectedImage', imageIndex: number): void;
    }>();

    const activeImg = ref(activeImageIdx);
    const otherImagesContainerRef = ref<Element>();
    const activeImgIsChanging = ref(false);

    const isMobile: boolean = inject('isMobile', false);

    const onDesktopImageSelectorClickHandler = (
        event: MouseEvent,
        index: number,
    ): void => {
        if (activeImgIsChanging.value || index === activeImg.value) {
            return;
        }

        const timeLine = gsap.timeline();
        const activeImgSelector = isRenderedInModal
            ? '.modal #active-img'
            : '#active-img';

        timeLine.to(activeImgSelector, {
            opacity: 0,
            duration: 0.3,
            onStart: () => {
                activeImgIsChanging.value = true;
            },
            onComplete: () => {
                otherImagesContainerRef.value!.querySelector('#active')!.id =
                    '';
                (event.target as Element).id = 'active';
                activeImg.value = index;
            },
        });
        timeLine.to(
            activeImgSelector,
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
    const onMobileImgSelectorClickHandler = (nextIndex: number): void => {
        if (nextIndex > 0 && activeImg.value + nextIndex < images.length) {
            activeImg.value = activeImg.value + 1;
        } else if (nextIndex < 0 && activeImg.value + nextIndex >= 0) {
            activeImg.value = activeImg.value - 1;
        }
    };
</script>

<template>
    <div class="light-box">
        <img
            :src="images[activeImg].src"
            :alt="images[activeImg].alt"
            id="active-img"
            :class="{
                'reset-hover': isRenderedInModal,
                'active-img-width-modal': isRenderedInModal,
            }"
            @click="$emit('openModal')"
        />
        <div
            class="light-box__other-images"
            :class="{ 'light-box__other-images-modal': isRenderedInModal }"
            ref="otherImagesContainerRef"
            v-if="!isMobile"
        >
            <div v-for="({ src, alt }, index) in images" :key="src">
                <img
                    :id="index === activeImg ? 'active' : ''"
                    :src="src"
                    :alt="alt"
                    @click="
                        (event) => {
                            const canEmit =
                                !isMobile &&
                                !isRenderedInModal &&
                                !activeImgIsChanging;

                            onDesktopImageSelectorClickHandler(event, index);

                            if (canEmit) {
                                $emit('selectedImage', index);
                            }
                        }
                    "
                />
            </div>
        </div>
        <div
            class="light-box__selector light-box__selector--next"
            @click="() => onMobileImgSelectorClickHandler(1)"
            v-if="isMobile || isRenderedInModal"
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
            class="light-box__selector light-box__selector--previous"
            @click="() => onMobileImgSelectorClickHandler(-1)"
            v-if="isMobile || isRenderedInModal"
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
        @include flex-container(column, flex-start, center, 6rem);

        height: 100%;
        position: relative;

        img {
            border-radius: 2rem;
        }

        #active-img {
            width: 55%;
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

        &__selector {
            @include width-and-height(4rem, 4rem);

            position: absolute;
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
            bottom: 55%;
            left: 70%;
        }

        &__selector--previous {
            bottom: 55%;
            left: 30%;
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
        }
    }

    .active-img-width-modal {
        width: 40% !important;
    }

    .light-box__other-images-modal {
        width: 50% !important;
    }

    .reset-hover {
        &:hover {
            cursor: default !important;
            filter: unset !important;
        }
    }
</style>
