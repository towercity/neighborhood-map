console.log("linked!");

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map-div'), {
        center: {lat: 27.954, lng: -82.459},
        scrollwheel: false,
        mapTypeControl: false,
        zoom: 10
    });
}
