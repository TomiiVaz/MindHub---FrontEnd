import { getCategories, getCards, data } from './data.js';

// Es el contenedor de los check
const contCategories = document.getElementById('categories');
// Es el input
let search = document.getElementById('search')
// Es el contenedor de cada tarjeta
const content = document.getElementById('content')

// Imprime todas las categorias en check
getCategories(data)

// Imprime todas las tarjetas
getCards(data.events)

// Filtra por el input search y retorna filtrado
function getFilterCardSearch(data, search) {
    let searchValue = search.value
    let eventsFiltered = data.events.filter(event => event.name.toLowerCase().startsWith(searchValue.toLowerCase()))
    return eventsFiltered
}

function getFilterCardCheckbox(data, evt) {
    let categoryFilter = evt.target;
    if (categoryFilter.checked) {
        let eventsFiltered = data.events.filter(event => event.category == categoryFilter.name)
        return eventsFiltered
    }
    return ""
}

// Escucha cada tecla del search
search.addEventListener("keyup", function () {
    getCards(getFilterCardSearch(data, search))
})

// Escucha cada cambio en los check filtra e imprime
contCategories.addEventListener('change', (evt) => {
    getCards(getFilterCardCheckbox(data, evt))
})