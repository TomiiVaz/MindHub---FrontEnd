import { dataApi } from './data.js';

const { createApp } = Vue

const appCat = createApp({
    data() {
        return {
            categories: []
        }
    },
    mounted() {
        this.getCategories()
        addEventListener('change', () => {
            console.log("ADIOS")
        })
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

const appCard = createApp({
    data() {
        return {
            cards: []
        }
    },
    mounted() {
        this.getCards(dataApi)
    },
    methods: {
        getCards(info) {
            dataApi.events.forEach((event) => {
                this.cards.push({
                    id: event._id,
                    name: event.name,
                    description: event.description,
                    image: event.image,
                    price: event.price,
                })
            })
        },
    }

}).mount('#content')

const appFilter = createApp({
    data() {
        return {
            cards: []
        }
    },
    mounted() {
        addEventListener('change', () => {
            console.log("ADIOS")
        })
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

}).mount('#filter')

// const contCategories = document.getElementById('categories');
// let search = document.getElementById('search')


// function getGlobalFilter() {
//     let searchFilter = getFilterCardSearch(dataApi, search)
//     let checkOfSearchFilter = getFilterCardCheckbox(searchFilter)
//     getCards(checkOfSearchFilter)
// }

// function getFilterCardSearch(data, search) {
//     let searchValue = search.value
//     let eventsFiltered = data.events.filter(event => event.name.toLowerCase().startsWith(searchValue.toLowerCase()))
//     return eventsFiltered
// }
// function getFilterCardCheckbox(data) {
//     let checkboxes = document.querySelectorAll("input[type='checkbox']")
//     let array    checks = Array.from(checkboxes)
//     let checksChecked = arraychecks.filter(check => check.checked)
//     if (checksChecked.length == 0) {
//         return data
//     }
//     let checkValues = checksChecked.map(check => check.value)
//     let arrayFiltrado = data.filter(elemento => checkValues.includes(elemento.category))
//     return arrayFiltrado
// }

// contCategories.addEventListener('change', getGlobalFilter)
// search.addEventListener("input", getGlobalFilter)