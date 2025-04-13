<script setup>
import { useDataStore } from '../app/stores/data-store.js';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import router from '../app/router.js';

const dataStore = useDataStore();
const { employeesData, selectedData } = storeToRefs(dataStore);

const selectedFilters = ref({
    city: null,
    workshop: null,
    employee: null,
    team: null,
    shift: null,
});

const resetSelectedFilters = JSON.parse(JSON.stringify(selectedFilters.value));

watch(
    () => selectedFilters.value.city,
    (newValue, oldValue) => {
        if (oldValue !== null) {
            selectedFilters.value.workshop = null;
        }
    },
    { deep: true }
);

watch(
    () => selectedFilters.value.workshop,
    (newValue, oldValue) => {
        if (oldValue !== null) {
            selectedFilters.value.employee = null;
        }
    }
);

const computedCities = computed(() => {
    if (selectedFilters.value.workshop !== null) {
        const selectedWorkshopCityId = employeesData.value.workshops.find(
            workshop => workshop.name === selectedFilters.value.workshop
        ).cityId;

        selectedFilters.value.city = employeesData.value.cities.find(city => city.id === selectedWorkshopCityId).name;
    }

    if (selectedFilters.value.employee !== null) {
        const selectedEmployee = employeesData.value.employees.find(
            employee => employee.name === selectedFilters.value.employee
        );

        const selectedEmployeeWorkshop = employeesData.value.workshops.find(
            workshop => workshop.id === selectedEmployee.workshopId
        );

        selectedFilters.value.workshop = selectedEmployeeWorkshop.name;
    }

    return employeesData.value.cities;
});

const computedWorkshops = computed(() => {
    if (selectedFilters.value.city !== null) {
        const selectedCityId = employeesData.value.cities.find(city => city.name === selectedFilters.value.city).id;

        return employeesData.value.workshops.filter(workshop => workshop.cityId === selectedCityId);
    }

    return employeesData.value.workshops;
});

const computedEmployees = computed(() => {
    let employees = employeesData.value.employees;

    if (selectedFilters.value.city !== null) {
        const selectedCityId = employeesData.value.cities.find(city => city.name === selectedFilters.value.city).id;

        const workshopsIds = employeesData.value.workshops
            .filter(workshop => workshop.cityId === selectedCityId)
            .map(workshop => workshop.id);

        employees = employees.filter(employee => workshopsIds.includes(employee.workshopId));
    }

    if (selectedFilters.value.workshop !== null) {
        const selectedWorkshopId = employeesData.value.workshops.find(
            workshop => workshop.name === selectedFilters.value.workshop
        ).id;

        employees = employees.filter(employee => employee.workshopId === selectedWorkshopId);
    }

    return employees;
});

const isSaveButtonDisable = computed(() => {
    return !Object.values(selectedFilters.value).includes(null);
});

const onFormSave = () => {
    if (isSaveButtonDisable.value) {
        selectedData.value = selectedFilters.value;

        router.push('/result');
    }
};

const onFormReset = () => {
    selectedFilters.value = resetSelectedFilters;
};
</script>

<template>
    <div class="page-form">
        <h1 class="page-form__title">Заполните форму</h1>

        <div class="page-form__form">
            <label class="page-form__label">
                Выберите город:

                <select class="page-form__select" v-model="selectedFilters.city">
                    <option v-for="item in computedCities" :key="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </label>

            <label class="page-form__label">
                Выберите цех:

                <select class="page-form__select" v-model="selectedFilters.workshop">
                    <option v-for="item in computedWorkshops" :key="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </label>

            <label class="page-form__label">
                Выберите сотрудника:

                <select class="page-form__select" v-model="selectedFilters.employee">
                    <option v-for="item in computedEmployees" :key="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </label>

            <label class="page-form__label">
                Выберите бригаду:

                <select class="page-form__select" v-model="selectedFilters.team">
                    <option v-for="item in employeesData.teams" :key="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </label>

            <label class="page-form__label">
                Выберите сотрудника:

                <select class="page-form__select" v-model="selectedFilters.shift">
                    <option v-for="item in employeesData.shifts" :key="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </label>

            <div class="page-form__controls">
                <button :disabled="!isSaveButtonDisable" class="page-form__button" @click="onFormSave">
                    Сохранить данные
                </button>
                <button class="page-form__button" @click="onFormReset">Сбросить изменения</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-form {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 0 auto;
    padding: 5rem 2rem;

    &__title {
        margin: 0 0 2rem;
        text-align: center;
    }

    &__form {
        display: flex;
        align-self: center;
        flex-direction: column;
        width: 400px;
    }

    &__controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__select {
        min-width: 200px;
    }

    &__label {
        display: flex;
        justify-content: space-between;
        margin: 0 0 1rem;
    }

    &__button {
        padding: 0.4rem;
    }
}
</style>
