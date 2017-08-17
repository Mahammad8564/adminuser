

(function () {
    'use strict';

    angular.module('myra').controller('AdminHomeController', AdminHomeController);

    AdminHomeController.$inject = ['Authentication'];

    function AdminHomeController(Authentication) {
        var vm = this;

        $(document).ready(function () {
            $('.parallax').parallax();
        });

      
    }

})();