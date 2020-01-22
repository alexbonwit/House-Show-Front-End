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
    })

}

function loadNav() {
    const nav = document.querySelector('.main-nav')

    const eventsButton = document.createElement('button')
    eventsButton.innerText = 'Events'

    const performersButton = document.createElement('button')
    performersButton.innerText = 'Performers'

    const neighborhoodsButton = document.createElement('button')
    neighborhoodsButton.innerText = 'Neighborhoods'

    nav.append(eventsButton, performersButton, neighborhoodsButton)
    nav.addEventListener('click', e => {
        if (e.target === eventsButton) {
            getEvents()
        } else if (e.target === performersButton) {
            getPerformers()
        } else if (e.target === neighborhoodsButton) {
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
    eventDiv.id = `event-${eventObj.id}`
    
    const eventName = document.createElement('h3')
    eventName.innerText = eventObj.name

    const eventHood = document.createElement('h4')
    eventHood.innerText = eventObj.neighborhood.name

    const eventAddress = document.createElement('p')
    eventAddress.innerText = eventObj.address

    const eventTime = document.createElement('p')
    eventTime.innerText = eventObj.start_time

    const currentInterest = document.createElement('p')
    currentInterest.className = `event-interest`
    currentInterest.innerText = `${eventObj.interested_count} People Interested`

    const interestButton = document.createElement('button')
    interestButton.innerText = 'Interested?'

    const eventObjId = eventObj.id
    getShows(eventObjId)

    const h4 = document.createElement('h4')
    h4.innerText = 'Line up:'

    eventDiv.append(h4)

    eventDiv.append(eventName, eventHood, eventAddress, eventTime, h4, currentInterest, interestButton)

    cardContainer.append(eventDiv)

}

function getShows(eventObjId) {
    fetch(EVENTS_URL+'/'+eventObjId)
        .then(resp => resp.json())
        .then(showObjs => renderShows(showObjs))
}

function renderShows(showObjs) {
    showObjs.forEach(showObj => renderShow(showObj))
}

function renderShow(showObj) {
    
    const eventDiv = document.querySelector(`div#event-${showObj.event_id}`)
    const pTag = eventDiv.querySelector('.event-interest')
    
    const showDiv = document.createElement('div')
    showDiv.id = showObj.id
    
    const showH4 = document.createElement('h4')
    showH4.innerText = showObj.created_at
    
    const performerH5 = document.createElement('h5')
    performerH5.innerText = showObj.performer.name
    
    showDiv.append(showH4, performerH5)
    
    pTag.parentNode.insertBefore(showDiv, pTag)
    // debugger
}




main()