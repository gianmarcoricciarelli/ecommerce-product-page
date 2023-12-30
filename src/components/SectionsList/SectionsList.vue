<script setup lang="ts">
    import { ref } from 'vue';

    const { sections, isMobile } = withDefaults(
        defineProps<{ sections: string[]; isMobile: boolean }>(),
        { isMobile: false },
    );

    const sectionsContainerRef = ref<HTMLDivElement>();
    const currentSectionBarRef = ref<HTMLDivElement>();

    const onHoverHandler = (index: number): void => {
        const {
            width: sectionsContainerWidth,
            height: sectionsContainerHeight,
        } = sectionsContainerRef.value!.getBoundingClientRect();

        if (!isMobile) {
            currentSectionBarRef.value!.style.left = `${
                (sectionsContainerWidth / sections.length) * index
            }px`;
        } else {
            currentSectionBarRef.value!.style.top = `${
                (sectionsContainerHeight / sections.length) * index
            }px`;
        }
    };
</script>

<template>
    <div class="sections-list" :class="{ 'sections-list-mobile': isMobile }">
        <div
            class="sections-list__sections"
            :class="{ 'sections-list__sections-mobile': isMobile }"
            ref="sectionsContainerRef"
        >
            <div
                v-for="(section, index) in sections"
                :key="index"
                class="section-container"
                :class="{ 'section-container-mobile': isMobile }"
                v-on:mouseover="() => onHoverHandler(index)"
            >
                <p>{{ section }}</p>
            </div>
        </div>
        <div
            class="sections-list__current-section-bar"
            :class="{ 'sections-list__current-section-bar-mobile': isMobile }"
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
                0.5rem
            );

            background-color: $orange;
            position: absolute;
            transition: all 300ms linear;
            left: 0;
            bottom: 0;
        }
    }

    .sections-list-mobile {
        @include flex-container(row, space-between, flex-start);

        .sections-list__sections-mobile {
            @include flex-container(column, space-between, flex-start);

            .section-container-mobile {
                @include width-and-height(
                    100%,
                    calc(100% / v-bind('sections.length'))
                );

                padding-left: 2rem;
                text-align: unset;

                p {
                    color: $very-dark-blue;
                    font-weight: 700;
                }
            }
        }

        .sections-list__current-section-bar-mobile {
            @include width-and-height(
                0.5rem,
                calc(100% / v-bind('sections.length'))
            );

            background-color: $orange;
            position: absolute;
            transition: all 300ms linear;
            left: 0;
            top: 0;
        }
    }
</style>
