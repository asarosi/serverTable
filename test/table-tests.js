describe('sTableController', function () {

  beforeEach(module('serverTable'));

  var httpBackend,
    controller,
    scope;

  beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();

    scope.countUrl = '/count';
    scope.listUrl = '/list';
    scope.actualItemsByPage = 5;

    controller = $controller('STableController', {$scope: scope});
    controller.currentPage = 2;
  }));

  describe('getPageCount() tests', function () {
    it('should get the page number and should not change current page value', function () {
      httpBackend.expect('GET',
        scope.countUrl)
        .respond(200, {numberOfRows: 10});

      controller.getPageCount(false)
        .then(function () {
          assert.strictEqual(controller.currentPage, 2, 'Current page number should not change!');
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
    it('should get the page number and should change current page value to zero', function () {
      httpBackend.expect('GET', scope.countUrl)
        .respond(200, {numberOfRows: 10});

      controller.getPageCount(true)
        .then(function () {
          assert.strictEqual(controller.currentPage, 0, 'Current page number be 0!');
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
    it('should get the page number with month filter', function () {
      httpBackend.expect('GET', scope.countUrl + '?month=1')
        .respond(200, {numberOfRows: 10});

      controller.month = 1;

      controller.getPageCount()
        .then(function () {
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
    it('should get the page number with year filter', function () {
      httpBackend.expect('GET', scope.countUrl + '?year=2015')
        .respond(200, {numberOfRows: 10});

      controller.year = 2015;

      controller.getPageCount()
        .then(function () {
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
    it('should get the page number with search text', function () {
      httpBackend.expect('GET', scope.countUrl + '?searchText=test')
        .respond(200, {numberOfRows: 10});

      controller.searchText = 'test';

      controller.getPageCount()
        .then(function () {
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
    it('should get the page number with search text, month and year filter', function () {
      httpBackend.expect('GET', scope.countUrl + '?month=1&searchText=test&year=2015')
        .respond(200, {numberOfRows: 10});

      controller.month = 1;
      controller.year = 2015;
      controller.searchText = 'test';

      controller.getPageCount()
        .then(function () {
          assert.strictEqual(controller.numberOfPages, 2, 'Number of pages should be equals with 10/5 (2)!');
        });

      httpBackend.flush();

    });
  });

  describe('getListFromServer() tests', function () {
    it('should get table data', function () {
      httpBackend.expectGET(scope.listUrl + '?currentPage=2&itemsByPage=5&sort=%7B%7D')
        .respond(200, [
          {id: 1, value: '1'},
          {id: 2, value: '2'}
        ]);

      controller.getListFromServer()
        .then(function () {
          assert.isArray(controller.tableData, 'Table data should be an array!');
          for (var i = 0; i < controller.tableData.length; i++) {
            assert.isObject(controller.tableData[i], 'Row ' + i + ' inside table data should be an object!');
          }
        });

      httpBackend.flush();

    });

    it('should get table data with month filter', function () {
      httpBackend.expect('GET',
        scope.listUrl + '?currentPage=2&itemsByPage=5&month=1&sort=%7B%7D')
        .respond(200, [
          {id: 1, value: '1'},
          {id: 2, value: '2'}
        ]);

      controller.month = 1;
      controller.getListFromServer();

      httpBackend.flush();

    });

    it('should get table data with year filter', function () {
      httpBackend.expect('GET',
        scope.listUrl + '?currentPage=2&itemsByPage=5&sort=%7B%7D&year=2015')
        .respond(200, [
          {id: 1, value: '1'},
          {id: 2, value: '2'}
        ]);

      controller.year = 2015;
      controller.getListFromServer();

      httpBackend.flush();

    });

    it('should get table data with search text', function () {
      httpBackend.expect('GET',
        scope.listUrl + '?currentPage=2&itemsByPage=5&searchText=test&sort=%7B%7D')
        .respond(200, [
          {id: 1, value: '1'},
          {id: 2, value: '2'}
        ]);

      controller.searchText = 'test';
      controller.getListFromServer();

      httpBackend.flush();

    });

    it('should get table data with all the filters', function () {
      httpBackend.expect('GET',
        scope.listUrl + '?currentPage=2&itemsByPage=5&month=1&searchText=test&sort=%7B%7D&year=2015')
        .respond(200, [
          {id: 1, value: '1'},
          {id: 2, value: '2'}
        ]);

      controller.month = 1;
      controller.year = 2015;
      controller.searchText = 'test';
      controller.getListFromServer();

      httpBackend.flush();

    });
  });
});