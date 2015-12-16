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
        '<select class="form-control" id="itemsByPage" ng-model="vm.actualItemsByPage" ng-options="rows.value as rows.value for rows in vm.itemsByPage"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/yearFilter.html',
        '<div class="form-group">' +
        '<label for="year">{{"YEAR_FILTER" | translate}}:</label>' +
        '<select class="form-control" id="year" ng-model="vm.year" ng-options="year.id as year.value for year in vm.years"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/monthFilter.html',
        '<div class="form-group">' +
        '<label for="month">{{"MONTH_FILTER" | translate}}:</label>' +
        '<select class="form-control" id="month" ng-model="vm.month" ng-options="month.id as month.value | translate for month in vm.months"></select>' +
        '</div>'
      );
      $templateCache.put('template/servertable/search.html',
        '<div class="form-group">' +
        '<label for="search">{{"SEARCH" | translate}}:</label>' +
        '<input class="form-control" id="search" ng-model="vm.searchText"/>' +
        '</div>'
      );
      $templateCache.put('template/servertable/onlyMissing.html',
        '<div class="form-group">' +
        '<label for="missing">{{"ONLY_MISSING" | translate}}:</label>' +
        '<input type="checkbox" ng-model="vm.onlyMissing" id="missing">' +
        '</div>'
      );
    }]);

  //angular.module('serverTable')
  //  .config(['$localStorageProvider',
  //    function ($localStorageProvider) {
  //      $localStorageProvider.setKeyPrefix('NewPrefix');
  //    }]);

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
      listUrl: '/list',
      sortAscIcon: 'glyphicon glyphicon-triangle-top',
      sortDescIcon: 'glyphicon glyphicon-triangle-bottom',
      sortNoneIcon: '',
      paginatorTemplateUrl: 'template/servertable/pagination.html',
      itemsByPageTemplateUrl: 'template/servertable/itemsByPage.html',
      yearFilterTemplateUrl: 'template/servertable/yearFilter.html',
      monthFilterTemplateUrl: 'template/servertable/monthFilter.html',
      searchFieldTemplateUrl: 'template/servertable/search.html',
      onlyMissingTemplateUrl: 'template/servertable/onlyMissing.html'
    });

  angular.module('serverTable')
    .provider('sTable', ['sTableConfig', function (sTableConfig) {

      var vm = this;

      Object.defineProperties(vm, {
        sortAscIcon: {
          get: function () {
            return sTableConfig.sortAscIcon;
          },
          set: function (value) {
            sTableConfig.sortAscIcon = value;
          }
        },
        sortDescIcon: {
          get: function () {
            return sTableConfig.sortDescIcon;
          },
          set: function (value) {
            sTableConfig.sortDescIcon = value;
          }
        },
        sortNoneIcon: {
          get: function () {
            return sTableConfig.sortNoneIcon;
          },
          set: function (value) {
            sTableConfig.sortNoneIcon = value;
          }
        },
        paginatorTemplateUrl: {
          get: function () {
            return sTableConfig.paginatorTemplateUrl;
          },
          set: function (value) {
            sTableConfig.paginatorTemplateUrl = value;
          }
        },
        itemsByPageTemplateUrl: {
          get: function () {
            return sTableConfig.itemsByPageTemplateUrl;
          },
          set: function (value) {
            sTableConfig.itemsByPageTemplateUrl = value;
          }
        },
        yearFilterTemplateUrl: {
          get: function () {
            return sTableConfig.yearFilterTemplateUrl;
          },
          set: function (value) {
            sTableConfig.yearFilterTemplateUrl = value;
          }
        },
        monthFilterTemplateUrl: {
          get: function () {
            return sTableConfig.monthFilterTemplateUrl;
          },
          set: function (value) {
            sTableConfig.monthFilterTemplateUrl = value;
          }
        },
        searchFieldTemplateUrl: {
          get: function () {
            return sTableConfig.searchFieldTemplateUrl;
          },
          set: function (value) {
            sTableConfig.searchFieldTemplateUrl = value;
          }
        },
        onlyMissingTemplateUrl: {
          get: function () {
            return sTableConfig.onlyMissingTemplateUrl;
          },
          set: function (value) {
            sTableConfig.onlyMissingTemplateUrl = value;
          }
        }
      });

      vm.$get = [, function () {
        return vm;
      }];

    }]);

  angular.module('serverTable')
    .factory('sTableService', ['$http', '$q', '$log', function ($http, $q, $log) {
      return {
        getDataFromServer: getDataFromServer
      };

      function getDataFromServer(url, query) {
        return $http.get(url, {params: query})
          .then(function (result) {
            return result.data;
          })
          .catch(function (error) {
            $log.error(error);
            return $q.reject(error);
          })
      }

    }]);

  angular.module('serverTable')
    .controller('STableController', ['$scope', '$http', 'sTableConfig', 'sTableService', function ($scope, $http, sTableConfig, sTableService) {

      var vm = this;
      vm.itemsByPage = sTableConfig.itemsByPage;
      vm.months = sTableConfig.months;
      vm.getListFromServer = getListFromServer;
      vm.getPageCount = getPageCount;
      vm.tableData = [];
      vm.numberOfPages = 0;
      vm.sort = {};

      function getListFromServer(resetCurrentPage, append) {

        if (resetCurrentPage) {
          vm.currentPage = 0;
        }

        var query = {
          itemsByPage: vm.actualItemsByPage,
          currentPage: vm.currentPage,
          month: vm.month,
          year: vm.year,
          searchText: vm.searchText,
          sort: vm.sort,
          onlyMissing: vm.onlyMissing
        };

        return sTableService.getDataFromServer($scope.listUrl, query)
          .then(function (result) {
            if (append) {
              vm.tableData = vm.tableData.concat(result);
            } else {
              vm.tableData = result;
            }
          });
      }

      function getPageCount() {

        var query = {
          month: vm.month,
          year: vm.year,
          searchText: vm.searchText,
          onlyMissing: vm.onlyMissing
        };

        return sTableService.getDataFromServer($scope.countUrl, query)
          .then(function (result) {
            var numberOfRows = result.numberOfRows;
            vm.numberOfPages = Math.ceil(numberOfRows / (vm.actualItemsByPage || numberOfRows));
          });
      }

    }]);

  angular.module('serverTable')
    .directive('sTable', ['sTableConfig', '$injector', function (sTableConfig, $injector) {
      return {
        restrict: 'A',
        controller: 'STableController',
        controllerAs: 'vm',
        link: function (scope, element, attrs, ctrl) {
          scope.countUrl = attrs.countUrl || sTableConfig.countUrl;
          scope.listUrl = attrs.listUrl || sTableConfig.listUrl;
          scope.hasCache = typeof attrs.sCache !== 'undefined';
          scope.cachePrefix = scope.hasCache ? attrs.sCache : '';
          scope.propagateScope = typeof attrs.propagateScope !== 'undefined';

          activate();

          function activate() {
            setCurrentPage();
            propagateScope();

            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(false);
              });
          }

          function setCurrentPage() {
            if (scope.hasCache) {
              var $localStorage = $injector.get('$localStorage');
              ctrl.currentPage = $localStorage.currentPage || 0;
            }
          }

          function propagateScope() {
            if (scope.propagateScope) {

              scope.$watch('vm.tableData', function () {
                scope.$parent.tableData = ctrl.tableData;
              });

              scope.$parent.getListFromServer = ctrl.getListFromServer;
              scope.$parent.getPageCount = ctrl.getPageCount;
            }
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
          return sTableConfig.paginatorTemplateUrl;
        },
        link: function (scope, element, attrs, ctrl) {

          scope.nextPage = nextPage;
          scope.previousPage = previousPage;

          activate();

          function activate() {
            setItemsByPage();
          }

          function setItemsByPage() {
            if (!ctrl.actualItemsByPage) {
              ctrl.actualItemsByPage = attrs.itemsByPage || sTableConfig.itemsByPage[1].value;
            }
          }

          function nextPage() {
            ctrl.currentPage += 1;
          }

          function previousPage() {
            ctrl.currentPage -= 1;
          }

          scope.$watch('vm.currentPage', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getListFromServer(false);
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
          return sTableConfig.itemsByPageTemplateUrl;
        },
        link: function (scope, element, attrs, ctrl) {

          activate();

          function activate() {
            setItemsByPage();
          }

          function setItemsByPage() {

            var defaultItemsByPage = sTableConfig.itemsByPage[1].value;

            if (scope.hasCache) {
              var $localStorage = $injector.get('$localStorage');
              ctrl.actualItemsByPage = $localStorage[scope.cachePrefix + 'actualItemsByPage'] || defaultItemsByPage;
            } else {
              ctrl.actualItemsByPage = attrs.itemsByPage || defaultItemsByPage;
            }
          }

          scope.$watch('vm.actualItemsByPage', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(true);
              });
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sYearFilter', ['$injector', 'sTableConfig', function ($injector, sTableConfig) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return sTableConfig.yearFilterTemplateUrl;
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

          activate();

          function activate() {
            ctrl.years = initYears();
            setYear();
          }

          function setYear() {
            if (scope.hasCache) {
              var $localStorage = $injector.get('$localStorage');
              ctrl.year = $localStorage[scope.cachePrefix + 'year'] || new Date().getFullYear();
            } else {
              ctrl.year = ctrl.years[0].id;
            }
          }

          scope.$watch('vm.year', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(true);
              });
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
          return sTableConfig.monthFilterTemplateUrl;
        },
        link: function (scope, element, attrs, ctrl) {

          activate();

          function activate() {
            setMonth();
          }

          function setMonth() {
            if (scope.hasCache) {
              var $localStorage = $injector.get('$localStorage');
              ctrl.month = $localStorage[scope.cachePrefix + 'month'] || sTableConfig.months[0].id;
            } else {
              ctrl.month = ctrl.months[0].id;
            }
          }

          scope.$watch('vm.month', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(true);
              });
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

          scope.$watchGroup(['vm.currentPage', 'vm.actualItemsByPage', 'vm.month', 'vm.year', 'vm.onlyMissing'], function (newVal) {
            // TODO [sarpad] currentPage cache not working
            $localStorage[scope.cachePrefix + 'currentPage'] = newVal[0];
            $localStorage[scope.cachePrefix + 'actualItemsByPage'] = newVal[1];
            $localStorage[scope.cachePrefix + 'month'] = newVal[2];
            $localStorage[scope.cachePrefix + 'year'] = newVal[3];
            $localStorage[scope.cachePrefix + 'onlyMissing'] = newVal[4];
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sSearch', ['sTableConfig', function (sTableConfig) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return sTableConfig.searchFieldTemplateUrl;
        },
        link: function (scope, element, attrs, ctrl) {

          scope.$watch('vm.searchText', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(true);
              });
          });

        }
      };
    }]);

  angular.module('serverTable')
    .directive('sSort', ['sTableConfig', function (sTableConfig) {
      return {
        restrict: 'A',
        require: '^?sTable',
        link: function (scope, element, attrs, ctrl) {

          var glyphicon_triangle_top = sTableConfig.sortAscIcon;
          var glyphicon_triangle_bottom = sTableConfig.sortDescIcon;
          var glyphicon_none = sTableConfig.sortNoneIcon;

          var name = attrs.sSort;

          function resetSort() {
            for (var key in ctrl.sort) {
              if (ctrl.sort.hasOwnProperty(key) && key !== name) {
                angular.element('#' + key + '_sort')[0].className = '';
              }
            }
          }

          function sort() {
            var icon = element[0].children[1];

            resetSort();
            ctrl.sort = {};

            switch (icon.className) {
              case glyphicon_triangle_top:
                icon.className = glyphicon_triangle_bottom;
                ctrl.sort[name] = 'descending';
                break;
              case glyphicon_triangle_bottom:
                icon.className = glyphicon_none;
                ctrl.sort[name] = 'none';
                break;
              case glyphicon_none:
                icon.className = glyphicon_triangle_top;
                ctrl.sort[name] = 'ascending';
                break;
            }
            ctrl.getListFromServer(true);
          }

          element.bind('click', function () {
            sort();
          });

          element.append('<i id="' + name + '_sort"></i>');
          element.css('cursor', 'pointer');
        }
      };
    }]);

  angular.module('serverTable')
    .directive('sScroll', ['sTableConfig', function (sTableConfig) {
      return {
        restrict: 'A',
        require: '^?sTable',
        link: function (scope, element, attrs, ctrl) {

          activate();

          function activate() {
            setItemsByPage();
          }

          var raw = element[0];

          element.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
              if (ctrl.currentPage < ctrl.numberOfPages) {
                ctrl.currentPage += 1;
                ctrl.getListFromServer(false, true);
              }
            }
          });

          function setItemsByPage() {
            if (!ctrl.actualItemsByPage) {
              ctrl.actualItemsByPage = attrs.itemsByPage || sTableConfig.itemsByPage[1].value;
            }
          }
        }
      }
    }]);

  angular.module('serverTable')
    .directive('sOnlyMissing', ['$injector', 'sTableConfig', function ($injector, sTableConfig) {
      return {
        restrict: 'EA',
        require: '^?sTable',
        templateUrl: function () {
          return sTableConfig.onlyMissingTemplateUrl;
        },
        link: function (scope, element, attrs, ctrl) {

          activate();

          function activate() {
            setMissingFlag();
          }

          function setMissingFlag() {

            if (scope.hasCache) {
              var $localStorage = $injector.get('$localStorage');
              ctrl.onlyMissing = $localStorage[scope.cachePrefix + 'onlyMissing'] || false;
            } else {
              ctrl.onlyMissing = true;
            }
          }

          scope.$watch('vm.onlyMissing', function () {
            // TODO [sarpad] all watch calls the server at the first load
            ctrl.getPageCount()
              .then(function () {
                ctrl.getListFromServer(true);
              });
          });

        }
      };
    }]);

}));
