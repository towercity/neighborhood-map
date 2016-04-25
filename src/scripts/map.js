'use strict';

// Declare global map variable
var map = 0;

function initMap() {
    var mapDiv = document.getElementById('map-div');
    var locationIndex = 0;

    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapDiv, {
        center: {lat: 25.721, lng: -80.2777},
        mapTypeControl: false,
        zoom: 13,
        //container for markers
        markers: [],
        //container for functions to be called outside the map function
        methods: {
            centerToMarker: function(place) {
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    query: place.address
                };

                service.textSearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        map.setZoom(15);
                        map.panTo(results[0].geometry.location);
                    }
                });
            },
            pinMarkers: function() {
                //removes previous markers
                map.markers.forEach(function(pin) {
                    pin.setMap(null);
                });
                map.markers = [];

                var service = new google.maps.places.PlacesService(map);
                var locations = my.vm.filteredLocations();
                locationIndex = 0;

                locations.forEach(function(place, idx) {
                    var request = {
                        query: place.address
                    };
                    service.textSearch(request, function(results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            var placeData = results[0];
                            var lat = placeData.geometry.location.lat();
                            var lon = placeData.geometry.location.lng();
                            var name = placeData.formatted_address;

                            map.markers[idx] = new google.maps.Marker({
                                map: map,
                                position: placeData.geometry.location,
                                name: name,
                                index: idx
                            });

                            map.markers[idx].addListener('click', function() {
                                var locations = my.vm.locations();
                                map.setZoom(15);
                                map.panTo(placeData.geometry.location);
                                my.vm.clickLocation(locations[map.markers[request.index].index]);
                            });
                        }
                    });
                    locationIndex++;
                });
            }
        }
    });

    // Waits till whole page is loaded to ensure vars from other files are available
    window.onload = function() {
        //calls viewmodel here, so that its loaded for us in map function
        my.vm = new ViewModel();
        ko.applyBindings(my.vm);
        map.methods.pinMarkers();
        //calls for foursquare data
        my.vm.callFoursquare();
    };
}
