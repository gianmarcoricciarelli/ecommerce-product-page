<script setup lang="ts">
    import type { Ref } from 'vue';

    import { inject, ref } from 'vue';

    const { sections } = defineProps<{ sections: string[] }>();

    const sectionsContainerRef = ref<HTMLDivElement>();
    const currentSectionBarRef = ref<HTMLDivElement>();

    const isMobile = inject<Ref<boolean>>('isMobile');

    const onHoverHandler = (index: number): void => {
        const { width: sectionsContainerWidth } =
            sectionsContainerRef.value!.getBoundingClientRect();

        if (isMobile?.value === false) {
            currentSectionBarRef.value!.style.left = `${
                (sectionsContainerWidth / sections.length) * index
            }px`;
        } else {
            currentSectionBarRef.value!.style.top = `${60 * index}px`;
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
                    @include change-color-on-hover(
                        $dark-grayish-blue,
                        $very-dark-blue
                    );
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
        height: calc(60 * v-bind('sections.length'));

        .sections-list__sections-mobile {
            @include flex-container(column, space-between, flex-start, 2rem);

            .section-container-mobile {
                @include width-and-height(100%, 4rem);
                @include flex-container(row, flex-start, center);

                height: 4rem;
                padding-left: 2.8rem;
                text-align: unset;

                p {
                    color: $very-dark-blue;
                    font-weight: 700;
                }
            }
        }

        .sections-list__current-section-bar-mobile {
            @include width-and-height(0.5rem, 4rem);

            background-color: $orange;
            position: absolute;
            transition: all 300ms linear;
            left: 0;
            top: 0;
        }
    }
</style>
