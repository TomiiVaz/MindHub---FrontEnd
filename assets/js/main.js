import { getCategories, getCards, data } from './data.js';
const contCategories = document.getElementById('categories');
let searchValue = document.getElementById('search');
const content = document.getElementById('content');
const search = document.getElementById('button');


getCategories(data)
getCards(data.events)


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