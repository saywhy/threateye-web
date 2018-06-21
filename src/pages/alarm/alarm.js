'use strict';

/* Controllers */
// Alarm controller
app.controller('AlarmController', [
  '$scope',
  '$http',
  '$state',
  function($scope, $http, $state) {
    // 初始化
    $scope.init = function(params) {
      $scope.searchData = {};
      console.log(moment());

      $scope.timepicker();
    };

    $scope.timepicker = function(params) {
      $('.timerange').daterangepicker(
        {
          timePicker: true,
          timePickerIncrement: 10,
          // startDate: moment().startOf('year'),
          // endDate: moment().endOf('day'),
          startDate: moment().subtract(365, 'days'),
          endDate: moment(),
          locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            format: 'YYYY-MM-DD HH:mm',
            customRangeLabel: '指定时间范围',
          },
          ranges: {
            今天: [moment().startOf('day'), moment().endOf('day')],
            '7日内': [
              moment()
                .startOf('day')
                .subtract(7, 'days'),
              moment().endOf('day'),
            ],
            本月: [moment().startOf('month'), moment().endOf('day')],
            今年: [moment().startOf('year'), moment().endOf('day')],
          },
        },
        function(start, end, label) {
          $scope.searchData.startTime = start.unix();
          $scope.searchData.endTime = end.unix();
        }
      );
    };

    $scope.init();
  },
]);
