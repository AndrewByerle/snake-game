<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCounterStore } from '../stores/counter';

const props = defineProps({
    head : String
})
const num = useCounterStore();
const seen = ref(true);

props.head;
</script>

<template>
    <h1> {{ props.head }} </h1>
    <div v-if="seen">
        <p>
            value: {{ num.counter }}
        </p>
        <button @click="num.increment()">
            +
        </button>
        <p>
            double: {{ num.doubleCount}}
        </p>
    </div>
    <div v-else>
        No counter to be seen
    </div>
    <button @click="seen = !seen">
        Toggle Counter
    </button>

</template>