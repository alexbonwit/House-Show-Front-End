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

    const titleDiv = document.querySelector('[data-event-id="form-title"]')
    const h4 = document.createElement('h4')
    h4.innerText = "Share your House Show!"
    titleDiv.append(h4)

    const nameDiv = document.querySelector('[data-event-id="name-field"]')
    const name = document.createElement('input')
    name.type = 'text'
    name.placeholder = 'Name your house show...'
    nameDiv.append(name)

    const addressDiv = document.querySelector('[data-event-id="address-field"]')
    const address = document.createElement('input')
    address.type = 'text'
    address.placeholder = '123 Fake St...'
    addressDiv.append(address)

    const dateTimeDiv = document.querySelector('[data-event-id="date-time-field"]')
    const dateTime = document.createElement('input')
    dateTime.type = 'text'
    dateTime.placeholder = 'October 31st, 10pm-ish...'
    dateTimeDiv.append(dateTime)

    listNeighborhoods()

    // listShows()

    const submitDiv = document.querySelector('[data-event-id="submit"]')
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
            neighborhood_id: parseInt(e.target[3].value),
            interested_count: 0
        }

        newEvent(newEventData)
        form.reset()

    })
}

function newEvent(eventData) {

    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(eventData)
    }

    fetch(EVENTS_URL, reqObj)
        .then(resp => resp.json())
        .then(eventObj => renderEvent(eventObj))
}

// function listShows() {
//     fetch(SHOWS_URL)
//         .then(resp => resp.json())
//         .then(shows => {
//             const showDiv = document.querySelector('[data-event-id="show-select"]')
//             const artist = document.createElement('select')
//             shows.forEach(artist => {
//                 let showOption = document.createElement('option')
//                 showOption.innerText = show.name
//                 artist.append(showOption)
//             })
//             showDiv.append(artist)
//         })
// }

function listNeighborhoods() {
    fetch(NEIGHBORHOODS_URL)
        .then(resp => resp.json())
        .then(neighborhoods => {
            const neighborhoodDiv = document.querySelector('[data-event-id="neighborhood-select"]')
            const location = document.createElement('select')
            neighborhoods.forEach(neighborhood => {
                let neighborOption = document.createElement('option')
                neighborOption.value = neighborhood.id
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
    interestButton.addEventListener('click', handleInterest)

    const eventObjId = eventObj.id
    getShows(eventObjId)

    const h4 = document.createElement('h4')
    h4.innerText = 'Line up:'

    eventDiv.append(h4)

    eventDiv.append(eventName, eventHood, eventAddress, eventTime, h4, currentInterest, interestButton)

    cardContainer.append(eventDiv)

}

function handleInterest(event) {
    const interest = event.target.previousElementSibling
    const newInterest = parseInt(interest.innerText) + 1

    const interestObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"interested_count": newInterest})
    }

    fetch(`${EVENTS_URL}/${event.target.parentElement.id}`, interestObj)
        .then(resp => resp.json())
        .then(interstObj => {interest.innerText = `${newInterest} People Interested`})
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
    showH4.innerText = showObj.name
    
    const performerH5 = document.createElement('h5')
    performerH5.innerText = showObj.performer.name
    
    showDiv.append(showH4, performerH5)
    
    pTag.parentNode.insertBefore(showDiv, pTag)
}




main()