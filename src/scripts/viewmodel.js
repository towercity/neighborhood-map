var locationArray = [
    {
        name: 'Tampa',
        desc: 'null',
        lat: null,
        long: null
    }
];

var ViewModel = function() {
    var self = this;

    this.locations = locationArray;

    this.showMenu = function() {
        $('#side-menu').slideToggle('slow');
    }
};

window.onload = function() {
    ko.applyBindings(new ViewModel());
};
