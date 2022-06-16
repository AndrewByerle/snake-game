<script setup lang="ts">
const { doneText } = defineProps<{
   doneText: string 
}>()
</script>

<template>
    <div class="copied">
        <p> {{ doneText }}</p>
    </div>
</template>

<style>
.copied {
    position: relative;
    top: -30px;
    color: black;
}
</style>
