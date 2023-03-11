import { getCategories, getCards, data } from "./data.js"
getCategories(data)
getCards(data.events)

const contCategories = document.getElementById('categories');
let searchValue = document.getElementById('search')
const content = document.getElementById('content')
const currentDate = data.currentDate
let upcomingEvents = []

for (let event of data.events) {
    if (event.date > currentDate) {
        upcomingEvents.push(event)
    }
}

function getFilterCard() {
    searchValue = document.getElementById('search').value
    if (searchValue.length >= 4) {
        let eventsFiltered = data.events.filter(event => event.category == searchValue || event.category == "Cinema")
        getCards(eventsFiltered)
    }
    else {
        getCards(data.events)
    }
}


searchValue.addEventListener("keyup", function (evt) {
    getFilterCard();
    evt.preventDefault();
})

contCategories.addEventListener('change', (e) => {
    let categoryFilter = e.target;
    if(categoryFilter.checked){
        let eventsFiltered = data.events.filter(event => event.category == categoryFilter.name)
        getCards(eventsFiltered)
    } else {
        getCards(data.events)
    }
})