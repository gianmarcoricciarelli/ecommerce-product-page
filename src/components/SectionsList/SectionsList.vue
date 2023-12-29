<script setup lang="ts">
    import { ref } from 'vue';

    const { sections } = defineProps<{ sections: string[] }>();

    const sectionsContainerRef = ref<HTMLDivElement>();
    const currentSectionBarRef = ref<HTMLDivElement>();

    const onHoverHandler = (index: number): void => {
        const { width: sectionsContainerWidth } =
            sectionsContainerRef.value!.getBoundingClientRect();

        currentSectionBarRef.value!.style.left = `${
            (sectionsContainerWidth / sections.length) * index
        }px`;
    };
</script>

<template>
    <div class="sections-list">
        <div class="sections-list__sections" ref="sectionsContainerRef">
            <div
                v-for="(section, index) in sections"
                class="section-container"
                v-on:mouseover="() => onHoverHandler(index)"
            >
                <p>{{ section }}</p>
            </div>
        </div>
        <div
            class="sections-list__current-section-bar"
            ref="currentSectionBarRef"
        ></div>
    </div>
</template>

<style scoped lang="scss">
    .sections-list {
        @include flex-container(column, space-between, flex-start);

        height: 100%;
        background-color: $white;
        position: relative;

        &__sections {
            @include width-and-height(100%, 100%);
            @include flex-container(row, space-between, flex-start);

            .section-container {
                @include width-and-height(
                    calc(100% / v-bind('sections.length')),
                    100%
                );
                text-align: center;

                p {
                    color: $dark-grayish-blue;
                    transition: color 300ms;

                    &:hover {
                        cursor: pointer;
                        color: $very-dark-blue;
                    }
                }
            }
        }

        &__current-section-bar {
            @include width-and-height(
                calc(100% / v-bind('sections.length')),
                0.2rem
            );

            background-color: $orange;
            position: absolute;
            transition: all 300ms linear;
            left: 0;
            bottom: 0;
        }
    }

    @media screen and (max-width: 37.5rem) {
        .sections-list {
            &__sections {
                @include flex-container(column, space-between, flex-start);

                .section-container {
                    p {
                        color: $very-dark-blue;
                        font-weight: 700;
                    }
                }
            }
        }
    }
</style>
