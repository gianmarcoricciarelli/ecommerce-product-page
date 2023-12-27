<script setup lang="ts">
    import { ref } from 'vue';

    defineProps<{ images: string[] }>();

    const activeImage = ref(0);
    const otherImagesContainerRef = ref<Element>(null);

    const onClickHandler = (event: MouseEvent): void => {
        otherImagesContainerRef.value.querySelector('#active').id = '';
        (event.currentTarget as Element).id = 'active';
    };
</script>

<template>
    <div class="light-box">
        <img :src="images[activeImage]" alt="Active Image" id="active-img" />
        <div class="light-box__other-images" ref="otherImagesContainerRef">
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
</style>
