

(function () {
    'use strict';

    angular.module('myra').controller('HomeController', HomeController);

    HomeController.$inject = ['Authentication'];

    function HomeController(Authentication) {
        var vm = this;

        $(document).ready(function () {
            $('.parallax').parallax();
        });

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator

            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        }
        );

        $('.dropdown-button').dropdown('open');

        $('.dropdown-button').dropdown('close');
    }

})();