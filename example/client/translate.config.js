(function () {
  'use strict';

  angular
    .module('app')
    .config(TranslateConfig);

  TranslateConfig.$inject = ['$translateProvider'];

  function TranslateConfig($translateProvider) {
    $translateProvider.translations('hu', {
      'YEAR': 'Év',
      'MONTH': 'Hónap',
      'YEAR_FILTER': 'Év',
      'MONTH_FILTER': 'Hónap',
      'ITEMS_BY_PAGE': 'Oldalankénti elemek',
      'JANUARY': 'Január',
      'FEBRUARY': 'Február',
      'MARCH': 'Március',
      'APRIL': 'Április',
      'MAY': 'Május',
      'JUNE': 'Június',
      'JULY': 'Július',
      'AUGUST': 'Augusztus',
      'SEPTEMBER': 'Szeptember',
      'OCTOBER': 'Október',
      'NOVEMBER': 'November',
      'DECEMBER': 'December',
      'SEARCH': 'Keresés',
      'ID': 'Azonosító',
      'NAME': 'Név',
      'EMAIL': 'E-mail cím',
      'PLACE': 'Születési hely'
    });

    $translateProvider.translations('en', {
      'YEAR': 'Year',
      'MONTH': 'Month',
      'YEAR_FILTER': 'Year filter',
      'MONTH_FILTER': 'Month filter',
      'ITEMS_BY_PAGE': 'Items by page',
      'JANUARY': 'January',
      'FEBRUARY': 'February',
      'MARCH': 'March',
      'APRIL': 'April',
      'MAY': 'May',
      'JUNE': 'June',
      'JULY': 'July',
      'AUGUST': 'August',
      'SEPTEMBER': 'September',
      'OCTOBER': 'October',
      'NOVEMBER': 'November',
      'DECEMBER': 'December',
      'SEARCH': 'Search',
      'ID': 'Identifier',
      'NAME': 'Name',
      'EMAIL': 'E-mail address',
      'PLACE': 'Birth place'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  }

})();
