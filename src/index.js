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
    eventDiv.setAttribute("data-event-id", eventObj.id)
    
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
    h4.className = 'lineUp'

    const showFormBtn = document.createElement('button')
    showFormBtn.innerText = 'Click here to add a show to this event'
    showFormBtn.addEventListener('click', function () {
        // check if the previous element is a form
        // if not, create it and attach it as a previous sibling
        // if yes, check if it is being displayed or not and then hide/show it
        if (this.previousElementSibling.tagName === 'FORM') {
            if (this.previousElementSibling.style.display === 'none') {
                    this.previousElementSibling.style.display = 'block'
            } else if (this.previousElementSibling.style.display === 'block'){
                    this.previousElementSibling.style.display = 'none'
            } 
        } else {    

            const nameLabel = document.createElement('label')
            nameLabel.innerText = 'Show name: '
            const nameInput = document.createElement('input')
            nameInput.type = 'text'
            nameInput.placeholder = 'Type your show name here ...'
            const submitBtn = document.createElement('input')
            submitBtn.type = 'submit'

            listPerformers()
                .then((selectNode)=>{
                    const form = document.createElement('form')
                    form.className = 'new-show-form'
                    form.style.display = 'block'

                    form.append(nameLabel, nameInput, selectNode, submitBtn)

                    this.parentNode.insertBefore(form, this)

                    form.addEventListener('submit', postNewShowForm)
                })
            
            
            
        }
    })

    eventDiv.append(eventName, eventHood, eventAddress, eventTime, h4, showFormBtn, currentInterest, interestButton)

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
    const eventId = showObj.event_id
    const eventDiv = document.querySelector(`[data-event-id='${eventId}']`)
    const lineUp = eventDiv.querySelector('h4.lineUp')
    
    const showDiv = document.createElement('div')
    showDiv.setAttribute("data-show-id", showObj.id)
    
    const showH4 = document.createElement('h4')
    showH4.innerText = showObj.name
    
    const performerH5 = document.createElement('h5')
    performerH5.innerText = showObj.performer.name
    
    showDiv.append(showH4, performerH5)
    
    lineUp.parentNode.insertBefore(showDiv, lineUp.nextElementSibling)
}

function listPerformers() {
    return fetch(PERFORMERS_URL)
        .then(resp => resp.json())
        .then(performers => {
            
            let options = performers.map(function(performer){
                return {label: performer.name, value: performer.id}
            })

            let selectNode = document.createElement('select')
            options.forEach(option => {
                let optionNode = document.createElement('option')
                optionNode.label = option.label
                optionNode.value = option.value
                selectNode.append(optionNode)
            })
            return selectNode
    })
}

function postNewShowForm () {
    debugger
}

main()