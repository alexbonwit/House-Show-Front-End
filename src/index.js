const BASE_URL = 'http://localhost:3000'
const EVENTS_URL = `${BASE_URL}/events`
const NEIGHBORHOODS_URL = `${BASE_URL}/neighborhoods`
const PERFORMERS_URL = `${BASE_URL}/performers`

function main() {
    document.addEventListener('DOMContentLoaded', () => {

        getEvents()


    })

}

function getEvents() {
    fetch(EVENTS_URL)
        .then(resp => resp.json())
        .then(eventObjs => renderEvents(eventObjs))

}

function renderEvents(eventData) {
    
    const cardContainer = document.querySelector('.card-container')
    // let child = cardContainer.lastElementChild
    // while (child) {
    //     cardContainer.removeChild(child);
    //     child = cardContainer.lastElementChild;
    // } 

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