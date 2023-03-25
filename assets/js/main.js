import { getCategories, getCards, dataApi } from './data.js';

const { createApp } = Vue

const app = createApp({
    data() {
        return {
            categories: ["pepe", "hola"]
        }
    },
    mounted() {

    },
    methods: {
        getCategories() {
            dataApi.events.forEach((event) => {
                if (!this.categories.includes(event.category)) {
                    this.categories.push(event.category);
                }
            });
        }
    }

}).mount('#categories')














// // Es el contenedor de los check
// let contCategories = document.getElementById('categories');
// // Es el input
// let search = document.getElementById('search')
// // Es el contenedor de cada tarjeta
// const content = document.getElementById('content')

// // Imprime todas las categorias en check
// getCategories(dataApi)

// // Imprime todas las tarjetas
// getCards(dataApi.events)

// // Filtra por el input search y retorna filtrado
// function getFilterCardSearch(data, search) {
//     let searchValue = search.value
//     let eventsFiltered = data.events.filter(event => event.name.toLowerCase().startsWith(searchValue.toLowerCase()))
//     return eventsFiltered
// }

// function getFilterCardCheckbox(data) {
//     let checkboxes = document.querySelectorAll("input[type='checkbox']")
//     let arraychecks = Array.from(checkboxes)
//     let checksChecked = arraychecks.filter(check => check.checked)
//     if (checksChecked.length == 0) {
//         return data
//     }
//     let checkValues = checksChecked.map(check => check.value)
//     let arrayFiltrado = data.filter(elemento => checkValues.includes(elemento.category))
//     return arrayFiltrado
// }

// function getGlobalFilter() {
//     let searchFilter = getFilterCardSearch(dataApi, search)
//     let checkOfSearchFilter = getFilterCardCheckbox(searchFilter)
//     getCards(checkOfSearchFilter)
// }

// // Escucha cada tecla del search
// search.addEventListener("input", getGlobalFilter)

// // Escucha cada cambio en los check filtra e imprime
// contCategories.addEventListener('change', getGlobalFilter)