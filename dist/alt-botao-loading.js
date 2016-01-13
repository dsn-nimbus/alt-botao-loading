;(function(ng) {
  "use strict";

  ng.module('alt.botao-loading', [])
    .directive('altBotaoLoading', ['$timeout', function($timeout) {
      var _scope = {
        tempoLoading: '@'
      };

      var _link = function(scope, element, attrs) {
        var TEMPO_LOADING = scope.tempoLoading ? ~~scope.tempoLoading : 2000;

        element.on('click', function() {
          element.prop('disabled', true);

          $timeout(function() {
              element.prop('disabled', false);
          }, TEMPO_LOADING);
        });
      };

      var _restrict = 'A';

      return {
        scope: _scope,
        link: _link,
        restrict: _restrict
      }
    }]);
}(angular));
