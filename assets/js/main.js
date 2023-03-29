import { dataApi } from './data.js';

const { createApp } = Vue

const appCat = createApp({
    data() {
        return {
            cards: [],
            cardsBackUp: [],
            inputText: "",
            categories: [],
            categoriesSelected: [],
        }
    },
    created() {
        this.getData()
    },
    mounted() {

    },
    methods: {
        getData() {
            this.cards = dataApi.events
            this.cardsBackUp = dataApi.events
            this.getCategories(dataApi)
        },

        getCategories(data) {
            data.events.forEach(event => {
                if (!this.categories.includes(event.category) && event.category) {
                    this.categories.push(event.category);
                }
            });
        },


    },
    computed: {
        filterCards() {
            let firstFilter = this.cardsBackUp.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if (!this.categoriesSelected.length) {
                this.cards = firstFilter
            } else {
                this.cards = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        }

    }

}).mount('#app')