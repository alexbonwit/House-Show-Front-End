const BASE_URL = 'http://localhost:3000'
const EVENTS_URL = `${BASE_URL}/events`
const NEIGHBORHOODS_URL = `${BASE_URL}/neighborhoods`
const PERFORMERS_URL = `${BASE_URL}/performers`

function main() {
    document.addEventListener('DOMContentLoaded', () => {

        getEvents()

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

    eventDiv.append(eventName, eventHood, eventAddress, eventTime, currentInterest, interestButton)

    cardContainer.append(eventDiv)

}





main()