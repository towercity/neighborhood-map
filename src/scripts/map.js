'use strict';

// Declare global map variable
var map = 0;

function initMap() {
    var mapDiv = document.getElementById('map-div');
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapDiv, {
        center: {lat: 25.721, lng: -80.2777},
        mapTypeControl: false,
        zoom: 12
    });

    function locationFinder() {
        var locations = [];

        locationArray.forEach(function(place) {
            locations.push(place.address);
        });

        return locations;
    }

    function createMapMarker(placeData) {
        var lat = placeData.geometry.location.lat();
        var lon = placeData.geometry.location.lng();
        var name = placeData.formatted_address;

        var marker = new google.maps.Marker({
          map: map,
          position: placeData.geometry.location,
          name: name
        });

        marker.addListener('click', function() {
            map.setZoom(15);
            map.panTo(placeData.geometry.location);
            //my.vm.clickLocation(place);
        });
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    function pinMarkers(locations) {
        var service = new google.maps.places.PlacesService(map);

        locations.forEach(function(place) {
            var request = {
                query: place
            };
            service.textSearch(request, callback);
        });
    }

    // Waits till whole page is loaded to ensure vars from other files are available
    $(document).ready(function() {
        var locations = locationFinder();

        pinMarkers(locations);

        /*
        locationArray.forEach(function(place) {
            marker.addListener('click', function() {
                map.setZoom(13);
                map.panTo(place.coordinates);
                my.vm.clickLocation(place);
            });
        });
        */
    });
};
