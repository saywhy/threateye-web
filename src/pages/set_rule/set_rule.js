/* Controllers */
app.controller('Set_ruleController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    // 初始化
    
    
    $scope.init = function (params) {
        $("#avatval").click(function(){
            $("input[type='file']").trigger('click');
        });
        $("input[type='file']").change(function(){
            $("#avatval").val($(this).val());
        });
    };


    $scope.init();
}]);