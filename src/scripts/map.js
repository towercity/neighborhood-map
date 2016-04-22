'use strict';

// Declare global map variable
var map = 0;

function initMap() {
    var mapDiv = document.getElementById('map-div');
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(mapDiv, {
        center: {lat: 25.721, lng: -80.2777},
        mapTypeControl: false,
        zoom: 13,
        //container for functions to be called outside the map function
        methods: {
            centerToMarker: function(place) {
                console.log(place);
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
            returnPlace: function(place) {
                map.methods.placeDataHolder = null;
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    query: place
                };
                console.log(map.methods.placeDataHolder);
                service.textSearch(request, map.methods.callback);
            }
        }
    });

    function pinMarkers() {
        var service = new google.maps.places.PlacesService(map);
        var locations = my.vm.locations();

        var i = 0;
        locations.forEach(function(place) {
            var request = {
                query: place.address
            };
            service.textSearch(request, function(results, status) {
                console.log(locations[i]);
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var placeData = results[0];
                    var lat = placeData.geometry.location.lat();
                    var lon = placeData.geometry.location.lng();
                    var name = placeData.formatted_address;

                    var marker = new google.maps.Marker({
                      map: map,
                      position: placeData.geometry.location,
                      name: name
                    });

                    marker.addListener('click', function(data) {
                        console.log(data);
                        map.setZoom(15);
                        map.panTo(placeData.geometry.location);
                        console.log(locations[i]);
                        my.vm.clickLocation(locations[i]);
                    });
                }
                i++;
            });
        });
    }

    // Waits till whole page is loaded to ensure vars from other files are available
    window.onload = function() {
        //calls viewmodel here, so that its loaded for us in map function
        my.vm = new ViewModel();
        ko.applyBindings(my.vm);
        pinMarkers();
    };
};
