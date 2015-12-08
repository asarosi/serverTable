(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    if (typeof angular === 'undefined') {
      module.exports = factory(require('angular'));
    } else {
      module.exports = factory(angular);
    }
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['../../example/client/bower_components/angular/angular'], factory);
  } else {
    // Global Variables
    factory(root.angular);
  }
}(this, function (angular) {
  'use strict';

  angular.module('serverTable', [])
    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('template/servertable/pagination.html',
        '<div id="server-table-paginator" class="server-table-paginator" ng-if="vm.numberOfPages > 1">' +
        '<button class="btn btn-default"  type="button" ng-disabled="vm.currentPage === 0" ng-click="previousPage()">' +
        '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
        '</button>' +
        '<b>{{vm.currentPage+1}}/{{vm.numberOfPages}}</b>' +
        '<button class="btn btn-default" type="button" ng-disabled="vm.currentPage === vm.numberOfPages-1" ng-click="nextPage()">' +
        '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
        '</button>' +
        '</div>'
      );
      $templateCache.put('template/servertable/itemsByPage.html',
        '<div class="form-group">' +
        '<label for="itemsByPage">{{"ITEMS_BY_PAGE" | translate}}:</label>' +
        '<select class="form-control" id="itemsByPage" ng-model="actualItemsByPage" ng-options="rows.value as rows.value for rows in vm.itemsByPage"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/yearFilter.html',
        '<div class="form-group">' +
        '<label for="year">{{"YEAR" | translate}}:</label>' +
        '<select class="form-control" id="year" ng-model="vm.year" ng-options="year.id as year.value for year in vm.years"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/monthFilter.html',
        '<div class="form-group">' +
        '<label for="month">{{"MONTH" | translate}}:</label>' +
        '<select class="form-control" id="month" ng-model="vm.month" ng-options="month.id as month.value | translate for month in vm.months"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/search.html',
        '<div class="form-group">' +
        '<label for="search">{{"SEARCH" | translate}}:</label>' +
        '<input class="form-control" id="search" ng-model="vm.searchText"/>' +
        '</div>'
      );
    }]);

  angular.module('serverTable')
    .constant('sTableConfig', {
      itemsByPage: [
        {value: 2},
        {value: 5},
        {value: 10},
        {value: 20},
        {value: 30},
        {value: 40}
      ],
      months: [
        {id: 1, value: 'JANUARY'},
        {id: 2, value: 'FEBRUARY'},
        {id: 3, value: 'MARCH'},
        {id: 4, value: 'APRIL'},
        {id: 5, value: 'MAY'},
        {id: 6, value: 'JUNE'},
        {id: 7, value: 'JULY'},
        {id: 8, value: 'AUGUST'},
        {id: 9, value: 'SEPTEMBER'},
        {id: 10, value: 'OCTOBER'},
        {id: 11, value: 'NOVEMBER'},
        {id: 12, value: 'DECEMBER'}
      ],
      countUrl: '/count',
      listUrl: '/list'
    });

  angular.module('serverTable')
    .controller('STableController', ['$scope', '$http', 'sTableConfig', function ($scope, $http, sTableConfig) {

      var vm = this;
      vm.itemsByPage = sTableConfig.itemsByPage;
      vm.months = sTableConfig.months;
      vm.getListFromServer = getListFromServer;
      vm.getPageCount = getPageCount;
      vm.tableData = [];
      vm.currentPage = 0;
      vm.numberOfPages = 0;
      vm.sort = {};

      function getListFromServer() {
        return $http.get($scope.listUrl,
          {
            params: {
              itemsByPage: $scope.actualItemsByPage,
              currentPage: vm.currentPage,
              month: vm.month,
              year: vm.year,
              searchText: vm.searchText,
              sort: vm.sort
            }
          })
          .then(function (result) {
            vm.tableData = result.data;
          });
      }

      function getPageCount(resetCurrentPage) {
        if (resetCurrentPage) {
          vm.currentPage = 0;
        }
        return $http.get($scope.countUrl,
          {
            params: {
              month: vm.month,
              year: vm.year,
              searchText: vm.searchText
            }
          })
          .then(function (result) {
            vm.numberOfPages = Math.ceil(result.data.numberOfRows / ($scope.actualItemsByPage || result.data.numberOfRows));
          });
      }

    }]);

  angular.module('serverTable')
    .directive('sTable', ['sTableConfig', function (sTableConfig) {
      return {
        restrict: 'A',
        controller: 'STableController',
        controllerAs: 'vm',
        link: function (scope, element, attrs, ctrl) {
          scope.countUrl = attrs.countUrl || sTableConfig.countUrl;
          scope.listUrl = attrs.listUrl || sTableConfig.listUrl;
          scope.hasCache = typeof attrs.sCache !== 'undefined';

          activate();

          function activate() {
            ctrl.getPageCount(false)
              .then(function () {
                ctrl.getListFromServer();
              });
          }
        }
      };
    }]);

  angular.module('serverTable')
    .directive('sPagination', ['sTableConfig', function (sTableConfig) {
      return {
        restrict: 'A',
        require: '^?sTable',
        templateUrl: function () {
          return 'template/servertable/pagination.html';
        },
        link: function (scope, element, attrs, ctrl) {

          scope.actualItemsByPage = attrs.itemsByPage || sTableConfig.itemsByPage[1].value;
          scope.nextPage = nextPage;
          scope.previousPage = previousPage;

          function nextPage() {
            ctrl.currentPage += 1;
          }

          function previousPage() {
            ctrl.currentPage -= 1;
          }

          scope.$watch('vm.currentPage', function (newVal, oldVal) {
            // TODO [sarpad] there is a bug when the data is cached
            //if (newVal !== oldVal) {
            ctrl.getListFromServer();
            //}
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sItemsByPage', ['$injector', 'sTableConfig', function ($injector, sTableConfig) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return 'template/servertable/itemsByPage.html';
        },
        link: function (scope, element, attrs, ctrl) {

          if (scope.hasCache) {
            var $localStorage = $injector.get('$localStorage');
            scope.actualItemsByPage = $localStorage.actualItemsByPage || sTableConfig.itemsByPage[0].value;
          } else {
            scope.actualItemsByPage = attrs.itemsByPage || sTableConfig.itemsByPage[0].value;
          }

          scope.$watch('actualItemsByPage', function (newVal, oldVal) {
            // TODO [sarpad] there is a bug when the data is cached
            //if (newVal !== oldVal) {
            ctrl.getPageCount(true)
              .then(function () {
                ctrl.getListFromServer();
              });
            //}
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sYearFilter', ['$injector', function ($injector) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return 'template/servertable/yearFilter.html';
        },
        link: function (scope, element, attrs, ctrl) {

          var startYear = attrs.start || new Date().getFullYear();
          var endYear = attrs.end || new Date().getFullYear();

          function initYears() {
            var years = [];

            for (var i = endYear; i >= startYear; i--) {
              years.push({id: i, value: i});
            }

            return years;
          }

          ctrl.years = initYears();

          if (scope.hasCache) {
            var $localStorage = $injector.get('$localStorage');
            ctrl.year = $localStorage.year || new Date().getFullYear();
          } else {
            ctrl.year = ctrl.years[0].id;
          }

          scope.$watch('vm.year', function (newVal, oldVal) {
            // TODO [sarpad] there is a bug when the data is cached
            //if (newVal !== oldVal) {
            ctrl.getPageCount(true)
              .then(function () {
                ctrl.getListFromServer();
              });
            //}
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sMonthFilter', ['$injector', 'sTableConfig', function ($injector, sTableConfig) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return 'template/servertable/monthFilter.html';
        },
        link: function (scope, element, attrs, ctrl) {

          if (scope.hasCache) {
            var $localStorage = $injector.get('$localStorage');
            ctrl.month = $localStorage.month || sTableConfig.months[0].id;
          } else {
            ctrl.month = ctrl.months[0].id;
          }

          scope.$watch('vm.month', function (newVal, oldVal) {
            // TODO [sarpad] there is a bug when the data is cached
            //if (newVal !== oldVal) {
            ctrl.getPageCount(true)
              .then(function () {
                ctrl.getListFromServer();
              });
            //}
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sCache', ['$localStorage', function ($localStorage) {
      return {
        restrict: 'A',
        require: '^?sTable',
        link: function (scope) {

          scope.$watchGroup(['vm.currentPage', 'actualItemsByPage', 'vm.month', 'vm.year'], function (newVal) {
            $localStorage.currentPage = newVal[0];
            $localStorage.actualItemsByPage = newVal[1];
            $localStorage.month = newVal[2];
            $localStorage.year = newVal[3];
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sSearch', function () {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return 'template/servertable/search.html';
        },
        link: function (scope, element, attrs, ctrl) {

          scope.$watch('vm.searchText', function (newVal, oldVal) {
            // TODO [sarpad] there is a bug when the data is cached
            //if (newVal !== oldVal) {
            ctrl.getPageCount(true)
              .then(function () {
                ctrl.getListFromServer();
              });
            //}
          });

        }
      };
    });

  angular.module('serverTable')
    .directive('sSort', function () {
      return {
        restrict: 'A',
        require: '^?sTable',
        link: function (scope, element, attrs, ctrl) {

          var name = attrs.sSort;
          var sortOrders = ['none', 'ascending', 'descending'];
          var actualSort = sortOrders[0];

          function sort() {
            var icon = element[0].children[0];

            switch (actualSort) {
              case 'ascending':
                icon.className = 'glyphicon glyphicon-triangle-bottom';
                actualSort = 'descending';
                break;
              case 'descending':
                icon.className = '';
                actualSort = 'none';
                break;
              case 'none':
                icon.className = 'glyphicon glyphicon-triangle-top';
                actualSort = 'ascending';
                break;
            }

            ctrl.sort[name] = actualSort;
            ctrl.getListFromServer();
          }

          element.bind('click', function () {
            sort();
          });

          element.append('<i></i>');
          element.css('cursor', 'pointer');
        }
      };
    });
}));
