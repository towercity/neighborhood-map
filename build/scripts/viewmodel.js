"use strict";var locationArray=[{address:"439 Sevilla Ave, Coral Gables, Florida 33134",desc:"",price:1500,bedrooms:1,bathrooms:1,sqft:850,laundry:"On site",available:"June 1st",contactName:"Perkins Property",contactPhone:"305-665-3636",link:"http://www.trulia.com/rental/3211021780-439-Sevilla-Ave-4-Coral-Gables-FL-33134#photo-2"},{address:"701 Valencia Ave 1F, Coral Gables, Florida 33134",desc:"",price:1350,bedrooms:2,bathrooms:1,sqft:803,laundry:"ASK",available:"",contactName:"Licia Lopez/Tony Portillo",contactPhone:"305-303-1939",link:"http://www.trulia.com/rental/3231466430-701-Valencia-Ave-1F-Coral-Gables-FL-33134#photo-2"},{address:"11 Menores Ave, Coral Gables, Florida 33134",desc:"",price:1300,bedrooms:1,bathrooms:1,sqft:0,laundry:"ASK",available:"",contactName:"Licia Lopez/Tony Portillo",contactPhone:"305-303-1939",link:"http://www.trulia.com/rental/3220846514-11-Menores-Ave-Coral-Gables-FL-33134#photo-13"},{address:"344 Mendoza Ave 2, Coral Gables, Florida 33134",desc:"",price:1375,bedrooms:1,bathrooms:1,sqft:780,laundry:"ASK",available:"",contactName:"George Faehnle",contactPhone:"305-405-0615",link:"http://www.trulia.com/rental/3220654549-344-Mendoza-Ave-2-Coral-Gables-FL-33134#photo-2"},{address:"340 Madeira Avenue, Coral Gables, Florida 33134",desc:"",price:1150,bedrooms:1,bathrooms:1,sqft:0,laundry:"ASK",available:"",contactName:"MJ",contactPhone:"786-234-1469",link:"http://miami.craigslist.org/mdc/apa/5550813663.html"}],ViewModel=function(){var e=this;this.locations=ko.observableArray([]),this.filteredLocations=ko.observableArray([]),locationArray.forEach(function(o){e.locations.push(new Location(o))}),locationArray.forEach(function(o){e.filteredLocations.push(new Location(o))}),this.selectedLocation=ko.observable(this.locations()[0]),this.searchInput=ko.observable(""),this.filterOn=ko.observable(!1),this.foursquareResults=ko.observableArray([]),this.filterLocations=function(){""===e.searchInput()||" "===e.searchInput()?(e.filteredLocations(e.locations()),e.filterOn(!1)):(e.filteredLocations([]),e.locations().forEach(function(o){var t=o.address.search(e.searchInput());t>0&&e.filteredLocations.push(o)}),e.filterOn(!0)),e.openMenu(),map.methods.pinMarkers()},this.removeFilter=function(){e.closeMenu(),e.searchInput(""),e.filterOn(!1),window.setTimeout(function(){e.filteredLocations(e.locations()),map.methods.pinMarkers()},100)},this.switchLocation=function(o){e.selectedLocation(o)},this.centerToMarker=function(e){map.methods.centerToMarker(e)},this.closeMenu=function(){$("#slide-menu").hasClass("open")&&e.toggleMenu()},this.openMenu=function(){$("#slide-menu").hasClass("open")||e.toggleMenu()},this.toggleMenu=function(){$("#slide-menu").slideToggle("fast"),$("#slide-menu").toggleClass("open")},this.toggleInfoWindow=function(){var e=$(window).width(),o=$("#popup");440>=e?o.hasClass("active")?o.animate({bottom:"-100vh"},300):o.animate({bottom:0},300):e>440&&(o.hasClass("active")?o.animate({right:-440},300):o.animate({right:0},300)),o.toggleClass("active")},this.clickLocation=function(o){e.switchLocation(o),e.closeMenu(),e.centerToMarker(o),$("#popup").hasClass("active")||e.toggleInfoWindow()},this.callFoursquare=function(){var o="https://api.foursquare.com/v2/venues/search?client_id=CNI2RXY5KHIB4ZGDBT3YIBUMVAEJHFDJ23EJFO44PTCHEXQA&client_secret=TYAYB40ONEWVNBRMGB0SZCHEU4352JZMY0M3W3SUUSHHTBFX&v=20130815&near="+e.selectedLocation().address+"&query=food&limit=5&radius=1000";$.get(o,e.pushFoursquareResults).error(function(){$("#foursquare-title").text("No information recieved from the server")})},this.pushFoursquareResults=function(o){var t=o.response.venues;e.foursquareResults([]),t.forEach(function(o){var t={name:o.name,category:o.categories[0].name,price:o.price,rating:o.rating,address:o.address,website:o.url};e.foursquareResults.push(t)})}},Location=function(e){this.address=e.address,this.desc=e.desc,this.price=e.price,this.bedrooms=e.bedrooms,this.bathrooms=e.bathrooms,this.sqft=e.sqft,this.laundry=e.laundry,this.available=e.available,this.contactName=e.contactName,this.contactPhone=e.contactPhone,this.link=e.link,this.streetviewPhoto="https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+this.address+" "},my={vm:null};