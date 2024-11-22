<template>
    Login
    <br>
    store count in Login: {{ countStore.count }}
    <br>
    store doubleCount in Login: {{ countStore.doubleCount }}
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const countStore = useCounterStore();


</script>