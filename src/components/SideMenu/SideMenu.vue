<script setup lang="ts"></script>

<template>
    <div class="side-menu">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .side-menu {
        @include width-and-height(75%, 100dvh);
    }
</style>
