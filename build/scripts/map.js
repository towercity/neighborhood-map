"use strict";function initMap(){var e=document.getElementById("map-div"),a=0;map=new google.maps.Map(e,{center:{lat:25.721,lng:-80.2777},mapTypeControl:!1,zoom:13,markers:[],methods:{centerToMarker:function(e){var a=new google.maps.places.PlacesService(map),o={query:e.address};a.textSearch(o,function(e,a){a==google.maps.places.PlacesServiceStatus.OK&&(map.setZoom(15),map.panTo(e[0].geometry.location))})},pinMarkers:function(){map.markers.forEach(function(e){e.setMap(null)}),map.markers=[];var e=new google.maps.places.PlacesService(map),o=my.vm.filteredLocations();o.forEach(function(o){var n={query:o.address,index:o.index};e.textSearch(n,function(e,a){if(a==google.maps.places.PlacesServiceStatus.OK){var o=e[0],m=n.index,t=o.formatted_address;map.markers[m]=new google.maps.Marker({map:map,position:o.geometry.location,name:t,index:m}),map.markers[m].addListener("click",function(){var e=my.vm.locations();map.setZoom(15),map.panTo(o.geometry.location),my.vm.clickLocation(e[map.markers[m].index]),map.markers.forEach(function(e){e.index===m?map.methods.startBounce(e):map.methods.stopBounce(e)})})}}),a++})},stopBounce:function(e){e.setAnimation(null)},startBounce:function(e){e.setAnimation(google.maps.Animation.BOUNCE)}}}),window.onload=function(){my.vm=new ViewModel,ko.applyBindings(my.vm),map.methods.pinMarkers()}}var map=0;