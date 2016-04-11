// TODO: Add locations objects array

var ViewModel = function() {
    var self = this;

    this.showMenu = function() {
        console.log("Run");
        $('#side-menu').toggleClass('visible');
    }
};

window.onload = function() {
    ko.applyBindings(new ViewModel());
};
