<script setup lang="ts">
    import { ref } from 'vue';
    import { useDetectMobileDevice } from '../../composables/useResizeObserver';

    defineProps<{ images: string[] }>();

    const activeImage = ref(0);
    const otherImagesContainerRef = ref<Element>();

    const { isMobile } = useDetectMobileDevice(document.body);

    const onClickHandler = (event: MouseEvent): void => {
        otherImagesContainerRef!.value!.querySelector('#active')!.id = '';
        (event.currentTarget as Element).id = 'active';
    };
</script>

<template>
    <div class="light-box">
        <img :src="images[activeImage]" alt="Active Image" id="active-img" />
        <div
            class="light-box__other-images"
            ref="otherImagesContainerRef"
            v-if="!isMobile"
        >
            <div id="active" v-on:click="onClickHandler">
                <img :src="images[0]" alt="Product Image 1" />
            </div>
            <div v-on:click="onClickHandler">
                <img :src="images[1]" alt="Product Image 2" />
            </div>
            <div v-on:click="onClickHandler">
                <img :src="images[2]" alt="Product Image 3" />
            </div>
            <div v-on:click="onClickHandler">
                <img :src="images[3]" alt="Product Image 4" />
            </div>
        </div>
        <div class="light-box__selector--next">
            <svg
                width="13"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                v-if="isMobile"
            >
                <path
                    d="m2 1 8 8-8 8"
                    stroke="#1D2026"
                    stroke-width="3"
                    fill="none"
                    fill-rule="evenodd"
                />
            </svg>
        </div>
        <div class="light-box__selector--previous">
            <svg
                width="12"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                v-if="isMobile"
            >
                <path
                    d="M11 1 3 9l8 8"
                    stroke="#1D2026"
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
            transition: all 300ms;

            &:hover {
                cursor: pointer;
                filter: opacity(50%);
            }
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

            div {
                @include width-and-height(4rem, 4rem);
                @include flex-container();

                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: $white;

                &:hover {
                    cursor: pointer;
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
</style>
