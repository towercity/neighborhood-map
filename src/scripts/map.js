'use strict';

// Declare global map variable
var map = 0;

function initMap() {
    var mapDiv = document.getElementById('map-div');
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapDiv, {
        center: {lat: 25.721, lng: -80.2777},
        mapTypeControl: false,
        zoom: 12,
        methods: {
            reenter: function(latLang) {
                map.setCenter(latLang);
            },
            geocodeAddress: function(address) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK){
                        return results[0].geometry.location;
                    } else {
                        console.log(status);
                    }
                });
            }
        }
    });

    // Waits till whole page is loaded to ensure vars from other files are available
    $(document).ready(function() {
        // Iterate through locationArray and add markers to the map
        locationArray.forEach(function(place) {
            var marker = new google.maps.Marker({
                position: {lat: place.lat, lng: place.lng},
                map: map,
                title: place.name,
                label: place.mapLabel
            });

            marker.addListener('click', function() {
                map.setZoom(13);
                map.panTo(marker.getPosition());
                my.vm.clickLocation(place);
            });
        });
    });

    google.maps.event.addDomListener(mapDiv, 'click', function() {
        //window.alert('Map was clicked!');
    });
};
