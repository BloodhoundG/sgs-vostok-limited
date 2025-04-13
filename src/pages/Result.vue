<script setup>
import { useDataStore } from '../app/stores/data-store.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const dataStore = useDataStore();
const { selectedData } = storeToRefs(dataStore);

const isSelectedDataEmpty = computed(() => {
    return !Object.values(selectedData.value).includes(null);
});
</script>

<template>
    <div class="page-result">
        <h1 class="page-result__title">Результаты ввода</h1>

        <div v-if="isSelectedDataEmpty" class="page-result__data">
            <p>Город: {{ selectedData?.city }}</p>
            <p>Цех: {{ selectedData?.workshop }}</p>
            <p>Сотрудник: {{ selectedData?.employee }}</p>
            <p>Бригада: {{ selectedData?.team }}</p>
            <p>Смена: {{ selectedData?.shift }}</p>
        </div>

        <p v-else class="page-result__message">Данных нет</p>
    </div>
</template>

<style lang="scss" scoped>
.page-result {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 0 auto;
    padding: 5rem 2rem;

    &__title {
        text-align: center;
    }

    &__data {
        display: flex;
        align-self: center;
        flex-direction: column;
        width: 400px;
    }

    &__message {
        text-align: center;
        font-size: 1.5rem;
    }
}
</style>
