

function main() {
    document.addEventListener('DOMContentLoaded', () => {

        getShows()



    })

}

function getShows() {
    fetch('')
        .then(resp => resp.json())
        .then(shows => console.log(shows))

}

function renderShows(showData) {


}







main()