import { getCategories, getCards, data } from "./data.js"
// Imprime todas las categorias en check
getCategories(data)

// Es el contenedor de los check
const contCategories = document.getElementById('categories');
// Es el input
let searchValue = document.getElementById('search')
// Es el contenedor de cada tarjeta
const content = document.getElementById('content')
const currentDate = data.currentDate
let upcomingEvents = []

for (let event of data.events) {
    if (event.date > currentDate) {
        upcomingEvents.push(event)
    }
}

// Imprime todas las tarjetas correspondientes
getCards(upcomingEvents)

// Filtra por el input search e imprime con el metodo reutilizable
function getFilterCard() {
    searchValue = document.getElementById('search').value
    if (searchValue.length != 0) {
        let eventsFiltered = data.events.filter(event => event.category.toLowerCase().startsWith(searchValue.toLowerCase()))
        getCards(eventsFiltered)
    }
    else {
        getCards(data.events)
    }
}

// Escucha cada tecla del search
searchValue.addEventListener("keyup", function (evt) {
    getFilterCard();
    evt.preventDefault();
})

// Escucha cada cambio en los check filtra e imprime
contCategories.addEventListener('change', (e) => {
    let categoryFilter = e.target;
    if(categoryFilter.checked){
        let eventsFiltered = data.events.filter(event => event.category == categoryFilter.name)
        getCards(eventsFiltered)
    } else {
        getCards(data.events)
    }
})