angular.module('myra')
    .directive("selectDirective", ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function () {
                    $(element).material_select();

                    //Cambia el modelo cuando cambia el elemento seleccionado
                    $(element).change(function () {
                        ngModelCtrl.$setViewValue($(element).val());
                    });
                });
            }
        }
    }])

