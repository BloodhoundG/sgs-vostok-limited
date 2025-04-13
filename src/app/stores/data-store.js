import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataStore = defineStore('app-data-store', () => {
    const selectedData = ref({
        city: null,
        workshop: null,
        employee: null,
        team: null,
        shift: null,
    });

    const employeesData = ref({
        cities: [
            { id: 1, name: 'Владимир' },
            { id: 2, name: 'Ярославль' },
        ],
        workshops: [
            { id: 1, cityId: 1, name: 'Владимирский цех 1' },
            { id: 2, cityId: 1, name: 'Владимирский цех 2' },
            { id: 3, cityId: 2, name: 'Ярославльский цех 1' },
            { id: 4, cityId: 2, name: 'Ярославльский цех 2' },
        ],
        employees: [
            { id: 1, workshopId: 1, name: 'Александров А.А.' },
            { id: 2, workshopId: 2, name: 'Борисов Б.Б.' },
            { id: 3, workshopId: 3, name: 'Викторов В.В.' },
            { id: 4, workshopId: 4, name: 'Григорьев Г.Г.' },
            { id: 5, workshopId: 4, name: 'Дмитриев Д.Д.' },
        ],
        teams: [
            { id: 1, name: 'Бригада 1' },
            { id: 2, name: 'Бригада 2' },
        ],
        shifts: [
            { id: 1, name: 'Дневная смена' },
            { id: 2, name: 'Ночная смена' },
        ],
    });

    return { employeesData, selectedData };
});
