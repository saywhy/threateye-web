/* Controllers */
app.controller('Set_yaraController', ['$scope', '$http', '$state','$rootScope', function ($scope, $http, $state,$rootScope) {
    // 初始化
    $scope.init = function (params) {
        clearInterval($rootScope.insideInterval);
        clearInterval($rootScope.startInterval);
        $rootScope.pageNow= 0;
    };
    $scope.yara_replace = function () {
        $("input[type='file']").trigger('click');
        $("input[type='file']").change(function (target) {
            $("#avatval").val($(this).val());
        });
    };
    $scope.init();
}]);