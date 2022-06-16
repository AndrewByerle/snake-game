<script setup lang="ts">
import DoneCheckmark from '../../components/icons/DoneCheckmark.vue';
import Done from './Done.vue';
import { ref } from 'vue';
import { EVENT_GENERATION_TIMEOUT } from '@/constants';

const emit = defineEmits(["share"])
const showCopied = ref(false);

const shareResults = async () => {
    showCopied.value = true;
    setTimeout(() => { showCopied.value = false }, EVENT_GENERATION_TIMEOUT)
    emit("share")
}
</script>

<template>
    <div class="center">
        <button class="not-button" @click="shareResults">Share</button>
        <div class="checkMark" v-if="showCopied">
            <DoneCheckmark />
            <Done done-text="copied"/>
        </div>
    </div>
</template>

<style>
.checkMark {
    transform: scale(.65);
    height: 50px;
    position: absolute;
    padding-left: 6em;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.not-button {
    background: inherit;
    border: none;
    color: #3a4;
}
</style>