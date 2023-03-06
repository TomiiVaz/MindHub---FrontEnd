const content = document.getElementById('content')
const currentDate = data.currentDate
let upcomingEvents = []

for (let event of data.events) {
    if (event.date > currentDate) {
        upcomingEvents.push(event)
    }
}

for (let event of upcomingEvents) {
    let card = document.createElement('div')
    card.innerHTML = `
    <div class="card tarjeta m-3">
        <img src="${event.image}" class="card-img-top" alt="${event.category}">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center m-2">
                    <h6>Price: $${event.price}</h6>
                    <div class="bg-logo mt-2 m-md-0 p-2 border border-2 border-dark">
                        <a href="./event.html" class="card-link text-dark">See more</a>
                    </div>
            </div>
        </div>
    </div>`
    content.appendChild(card)
}