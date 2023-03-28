import { dataApi } from './data.js';

const { createApp } = Vue

const appCat = createApp({
    data() {
        return {
            cards: [],
            categories: [],
            search: "",
        }
    },
    created() {
        this.getCategories()
        this.getCards(dataApi.events)
    },
    mounted() {
        this.search = document.getElementById('search')
    },
    methods: {
        getCards(info) {
            this.cards = []
            info.forEach((event) => {
                if (event.date < dataApi.currentDate) {
                    this.cards.push({
                        id: event._id,
                        name: event.name,
                        description: event.description,
                        image: event.image,
                        price: event.price,
                    })
                }

            })
        },

        getCategories() {
            dataApi.events.forEach((event) => {
                if (event.date < dataApi.currentDate) {
                    if (!this.categories.includes(event.category)) {
                        this.categories.push(event.category);
                    }
                }
            });
        },

        getGlobalFilter() {
            let searchFilter = this.getFilterCardSearch(dataApi, this.search)
            let checkOfSearchFilter = this.getFilterCardCheckbox(searchFilter)
            this.getCards(checkOfSearchFilter)
        },

        getFilterCardCheckbox(data) {
            let checkboxes = document.querySelectorAll("input[type='checkbox']")
            let arraychecks = Array.from(checkboxes)
            let checksChecked = arraychecks.filter(check => check.checked)
            if (checksChecked.length == 0) {
                return data
            }
            let checkValues = checksChecked.map(check => check.value)
            let arrayFiltrado = data.filter(elemento => checkValues.includes(elemento.category))
            return arrayFiltrado
        },

        getFilterCardSearch(data, search) {
            let searchValue = search.value
            let eventsFiltered = data.events.filter(event => event.name.toLowerCase().includes(searchValue.toLowerCase()))
            return eventsFiltered
        },
    },
    computed: {
        // Pasar los filtros acá
    }

}).mount('#app')