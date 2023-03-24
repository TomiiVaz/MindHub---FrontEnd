import { dataApi } from './data.js';

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const eventFind = dataApi.events.find(event => event._id == id)
const contEvent = document.getElementById('mainEvent')
let event = document.createElement('div')

event.classList.add('d-flex')
event.classList.add('flex-column')
event.classList.add('flex-md-row')
event.classList.add('align-items-center')
event.classList.add('justify-content-center')
event.classList.add('container')
event.classList.add('m-1')
event.classList.add('m-sm-4')
event.classList.add('p-5')
event.classList.add('br-color')


event.innerHTML = `
<figure class="w-100 w-md-50 text-center">
    <img src="${eventFind.image}" alt="Imagen Evento" class="w-100">
</figure>
<div class="w-50 text-center">
    <h1>${eventFind.name}</h1>
    <p>Category: ${eventFind.category}</p>
    <p>Descripcion: ${eventFind.description}</p>
    <p>Date: ${eventFind.date}</p>
    <p>Assistance: ${eventFind.assistance}</p>
    <p>Capacity: ${eventFind.capacity}</p>
    <p>Place: ${eventFind.place}</p>
    <p>Price: ${eventFind.price}</p>
</div>`

contEvent.appendChild(event)
