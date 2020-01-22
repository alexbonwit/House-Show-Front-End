let addEvent = false
const BASE_URL = 'http://localhost:3000'
const EVENTS_URL = `${BASE_URL}/events`
const NEIGHBORHOODS_URL = `${BASE_URL}/neighborhoods`
const PERFORMERS_URL = `${BASE_URL}/performers`
const SHOWS_URL = `${BASE_URL}/shows`

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const addBtn = document.querySelector('#new-event-btn')
        const eventForm = document.querySelector('.form-container')
        eventForm.style.display = 'none'
        addBtn.addEventListener('click', () => {
            // hide & seek with the form
            addEvent = !addEvent
            if (addEvent) {
                eventForm.style.display = 'block'
            } else if (!addEvent) {
                eventForm.style.display = 'none'
            }
        })
        
        loadNav()
        getEvents()
        renderForm()
    })

}

function renderForm() {

    const titleDiv = document.querySelector('#form-title')
    const h4 = document.createElement('h4')
    h4.innerText = "Share your House Show!"
    titleDiv.append(h4)

    const nameDiv = document.querySelector('#name-field')
    const name = document.createElement('input')
    name.type = 'text'
    name.placeholder = 'Name your house show...'
    nameDiv.append(name)

    const addressDiv = document.querySelector('#address-field')
    const address = document.createElement('input')
    address.type = 'text'
    address.placeholder = '123 Fake St...'
    addressDiv.append(address)

    const dateTimeDiv = document.querySelector('#date-time-field')
    const dateTime = document.createElement('input')
    dateTime.type = 'text'
    dateTime.placeholder = 'October 31st, 10pm-ish...'
    dateTimeDiv.append(dateTime)

    listNeighborhoods()

    listPerformers()

    const submitDiv = document.querySelector('#submit')
    const submit = document.createElement('button')
    submit.innerText = "Submit"
    submitDiv.append(submit)

    const form = document.querySelector('.add-event-form')
    form.addEventListener('submit', e => {
        e.preventDefault()

        const newEventData = {
            name: e.target[0].value,
            address: e.target[1].value,
            start_time: e.target[2].value,
            neighborhood_id: e.target.neighborhood_id.value,
            
        }

    })
}

function listPerformers() {
    fetch(PERFORMERS_URL)
        .then(resp => resp.json())
        .then(performers => {
            const performerDiv = document.querySelector('#performer-select')
            const player = document.createElement('select')
            performers.forEach(performer => {
                let performerOption = document.createElement('option')
                performerOption.innerText = performer.name
                player.append(performerOption)
            })
            performerDiv.append(player)
        })
}

function listNeighborhoods() {
    fetch(NEIGHBORHOODS_URL)
        .then(resp => resp.json())
        .then(neighborhoods => {
            const neighborhoodDiv = document.querySelector('#neighborhood-select')
            const location = document.createElement('select')
            neighborhoods.forEach(neighborhood => {
                let neighborOption = document.createElement('option')
                neighborOption.innerText = neighborhood.name
                location.append(neighborOption)
            })
            neighborhoodDiv.append(location)
        })
}

function loadNav() {
    const nav = document.querySelector('.main-nav')

    nav.addEventListener('click', e => {
        if (e.target.innerText === "Events") {
            getEvents()
        } else if (e.target.innerText === "Performers") {
            getPerformers()
        } else if (e.target.innerText === "Neighborhoods") {
            getNeighborhoods()
        }
    })
}

function getPerformers() {
    fetch(PERFORMERS_URL)
        .then(resp => resp.json())
        .then(performerObjs => renderPerformers(performerObjs))
}

function renderPerformers(performerObjs) {
    const cardContainer = document.querySelector('.card-container')
    let child = cardContainer.lastElementChild
    while (child) {
        cardContainer.removeChild(child);
        child = cardContainer.lastElementChild;
    }

    performerObjs.forEach(performer => renderPerformer(performer))
}

function renderPerformer(performer) {
    const cardContainer = document.querySelector('.card-container')

    const performerDiv = document.createElement('div')

    const performerName = document.createElement('h3')
    performerName.innerText = performer.name

    performerDiv.append(performerName)
    cardContainer.append(performerDiv)
}

function getNeighborhoods() {
    fetch(NEIGHBORHOODS_URL)
        .then(resp => resp.json())
        .then(neighborhoodObjs => renderNeighborhoods(neighborhoodObjs))
}

function renderNeighborhoods(neighborhoodData) {
    const cardContainer = document.querySelector('.card-container')
    let child = cardContainer.lastElementChild
    while (child) {
        cardContainer.removeChild(child);
        child = cardContainer.lastElementChild;
    }

    neighborhoodData.forEach(neighborhood => renderNeighborhood(neighborhood))
}

function renderNeighborhood(neighborhoodObj) {
    const cardContainer = document.querySelector('.card-container')

    const neighborhoodDiv = document.createElement('div')

    const neighborhoodName = document.createElement('h3')
    neighborhoodName.innerText = neighborhoodObj.name

    const city = document.createElement('p')
    city.innerText = neighborhoodObj.city

    const county = document.createElement('p')
    county.innerText = neighborhoodObj.county

    neighborhoodDiv.append(neighborhoodName, city, county)

    cardContainer.append(neighborhoodDiv)

}

function getEvents() {
    fetch(EVENTS_URL)
        .then(resp => resp.json())
        .then(eventObjs => renderEvents(eventObjs))

}

function renderEvents(eventData) {
    
    const cardContainer = document.querySelector('.card-container')
    let child = cardContainer.lastElementChild
    while (child) {
        cardContainer.removeChild(child);
        child = cardContainer.lastElementChild;
    } 

    eventData.forEach(event => renderEvent(event))

}

function renderEvent(eventObj) {

    const cardContainer = document.querySelector('.card-container')

    const eventDiv = document.createElement('div')
    
    const eventName = document.createElement('h3')
    eventName.innerText = eventObj.name

    const eventHood = document.createElement('h4')
    eventHood.innerText = eventObj.neighborhood.name

    const eventAddress = document.createElement('p')
    eventAddress.innerText = eventObj.address

    const eventTime = document.createElement('p')
    eventTime.innerText = eventObj.start_time

    const currentInterest = document.createElement('p')
    currentInterest.innerText = `${eventObj.interested_count} People Interested`

    const interestButton = document.createElement('button')
    interestButton.innerText = 'Interested?'

    // renderShows(eventObj)

    eventDiv.append(eventName, eventHood, eventAddress, eventTime, currentInterest, interestButton)

    cardContainer.append(eventDiv)

}

function renderShows(eventObj) {
    // debugger
}




main()