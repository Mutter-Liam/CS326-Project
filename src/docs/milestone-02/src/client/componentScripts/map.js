export function renderMap(element) {
    let markerCount = 0;
    // Get a reference to the parent container
    const parentContainer = element.parentElement;

    // Get the width and height of the parent container
    const parentWidth = parentContainer.offsetWidth;
    const parentHeight = parentContainer.offsetHeight;

    // Create a new map centered on Amherst, Massachusetts
    const umass = { lat: 42.3868, lng: -72.5301 };
    const map = new google.maps.Map(element, {
        center: umass,
        zoom: 15, // Adjust the zoom level as needed
    });

    // This event listener will add a marker when the map is clicked
    map.addListener("click", (event) => {
        addMarker(event.latLng, map);
    });

    // Function to add a marker to the map
    function addMarker(location, map) {
        new google.maps.Marker({
            position: location,
            map: map,
            label: "Gathering " + markerCount++
        });
    }
}
