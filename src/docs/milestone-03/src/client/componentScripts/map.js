export function renderMap(element) {
    const eventLocationBox = document.getElementById("eventCreateLocationInput");
    const eventTitleBox = document.getElementById("eventCreateTitleInput");

    let markerCount = 0;
    element.classList.add("panel");

    // Create a new map centered on Amherst, Massachusetts
    const umass = { lat: 42.3868, lng: -72.5301 };
    const map = new google.maps.Map(element, {
        center: umass,
        zoom: 15, // Adjust the zoom level as needed
    });

    let temporaryMarker; // Declare temporaryMarker variable here

    // This event listener will fill out the event location input and add a marker when the map is clicked
    map.addListener("click", (event) => {
        // If there's an existing temporary marker, remove it
        removeTemporaryMarker();
        
        // Fill out event location input
        eventLocationBox.value = event.latLng;

        // Add a temporary marker
        addTemporaryMarker(event.latLng, map);
    });

    // Function to add a temporary marker to the map
    function addTemporaryMarker(location, map) {
        temporaryMarker = new google.maps.Marker({
            position: location,
            map: map,
            label: eventTitleBox.value
        });
    }

    // Function to remove the temporary marker from the map
    function removeTemporaryMarker() {
        if (temporaryMarker) {
            temporaryMarker.setMap(null);
        }
    }

    //TODO: Create a function to load the events stored in some db
    function loadEvents() {

    }
}


