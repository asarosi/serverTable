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

    $translateProvider.preferredLanguage('hu');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  }

})();
