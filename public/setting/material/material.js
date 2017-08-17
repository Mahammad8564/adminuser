

(function () {
    'use strict';

    angular.module('myra').controller('MaterialController', MaterialController);

    MaterialController.$inject = ['Restangular', '$state', '$stateParams', '$uibModal'];

    function MaterialController(Restangular, $state, $stateParams, $uibModal) {
        var vm = this;

        vm.list = [];
        vm.save = save;
        vm.edit = edit;
        vm.getList = getList;
        vm.material = {
            isActive: true
        };
        vm.search = search;
        vm.order = order;
        vm.pageChange = pageChange;
        vm.options = {
            pagesize: 10,
            totalItems: 0,
            page: 1,
            search: ''
        }
        if ($stateParams.id && $stateParams.id != 'new') {
            Restangular.one('api/material/' + $stateParams.id).get().then(function (res) {
                vm.material = res.data;
            });
        }

        vm.onDelete = function (id) {
            Restangular.one('api/material/' + id).remove().then(function () {
                getList();
            });
        };

        vm.open = function (item) {
            console.log(item);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/setting/material/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function edit(obj) {
            $state.go('secure.setting.edit-material', { id: obj.id });
        }

        function save(form) {
            if (form.$invalid) {
                _.forEach(form.$error.required, function (frm) {
                    frm.$setDirty();
                });
                vm.isSubmitted = true;
                return;
            }
            vm.startProcessing = true;
            if (!vm.material.id) {
                Restangular.all('api/material').post(vm.material).then(function (res) {
                    // SweetAlert.swal("Material saved successfully!");
                    $state.go('secure.detail');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/material/' + vm.material.id).patch(vm.material).then(function (res) {
                    // SweetAlert.swal("Material updated successfully!");
                    $state.go('secure.detail');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

        function getList() {
            Restangular.all('api/material').getList(vm.options).then(function (res) {
                vm.list = res.data;
                vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

        function pageChange() {
            getList();
        }

        function search() {
            vm.options.page = 1;
            vm.options.where = 'title;$like|s|%' + vm.options.search + '%';
            getList();
        }

        function order(col, ord) {
            vm.asc = !vm.asc;
            var ascL = vm.asc ? 'asc' : 'desc';
            vm.options.sort = col + ' ' + ascL;
            vm.options.page = 1;
            getList();
        }

        getList();
    }

})();