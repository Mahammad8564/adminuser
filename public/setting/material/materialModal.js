

(function () {
    'use strict';

    angular.module('myra').controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['Restangular', '$state', '$stateParams', '$uibModalInstance', 'item', '$scope', '$timeout'];

    function ModalInstanceCtrl(Restangular, $state, $stateParams, $uibModalInstance, item, $scope, $timeout) {
        var vm = this;
        getStatus();

        if (item) vm.data = item;
        vm.save = save;

        vm.cancel = function () {
            $uibModalInstance.close('cancel');
        };

        function getStatus() {
            Restangular.all('api/status').getList().then(function (res) {
                vm.allStatus = res.data;
                console.log(vm.allStatus);
            });
        }

        function save(form) {
            vm.startProcessing = true;
            if (vm.data && !vm.data.id) {
                Restangular.all('api/material').post(vm.data).then(function (res) {
                    // SweetAlert.swal("Material saved successfully!");
                    $uibModalInstance.close(res);
                    // window.location.reload();
                }, function (err) {
                    $uibModalInstance.dismiss('cancel');
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/material/' + vm.data.id).patch(vm.data).then(function (res) {
                    // SweetAlert.swal("Material updated successfully!");
                    // $state.go('secure.detail');
                    $uibModalInstance.close(res);
                    // window.location.reload();
                }, function (err) {
                    $uibModalInstance.dismiss('cancel');
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }


    }

})();