<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'
import { ref, computed } from 'vue';

const todos = ref([{ val: 'cook', completed: false }, { val: 'eat', completed: false }])
const addTodo = ref('');

const createTodo = (e: any) => {
    if (e.target.value != '') {
        todos.value.push({ val: e.target.value, completed: false });
    }

    addTodo.value = '';

}
</script>


<template>
    <div>
        <h1> Todos</h1>
        <p>
            Enter todos below. Click to complete todo
        </p>
        <ol>
            <li v-for="item in todos" :class="{ strikeThroughText: item.completed }"
                @click="item.completed = !item.completed">
                {{ item.val }} - {{ item.completed }}
            </li>
        </ol>
        <div>
            <input v-model="addTodo" @keyup.enter="createTodo">
        </div>
    </div>



</template>


<style>
.strikeThroughText {
    text-decoration: line-through;
}


</style>