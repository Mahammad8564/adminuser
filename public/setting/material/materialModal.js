

(function () {
    'use strict';

    angular.module('myra').controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['Restangular', '$state', '$stateParams', '$uibModalInstance', 'item'];

    function ModalInstanceCtrl(Restangular, $state, $stateParams, $uibModalInstance, item) {
        var vm = this;

        console.log(item);
        if(item) vm.data = item;

        vm.save = save;

        function save(form) {
            vm.startProcessing = true;
            if (!vm.data.id) {
                Restangular.all('api/material').post(vm.data).then(function (res) {
                    // SweetAlert.swal("Material saved successfully!");
                    $uibModalInstance.close(res);
                    window.location.reload();
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
                    window.location.reload();
                }, function (err) {
                    $uibModalInstance.dismiss('cancel');
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }


    }

})();