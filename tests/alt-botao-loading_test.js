describe('alt.botao-loading', function() {
  var _scope, _q, _compile, _element, _timeoutMock;
  var TEMPO_DEFAULT = 2000;
  var TEMPO_CUSTOMIZADO = 10000;

  beforeEach(module('alt.botao-loading'));

  beforeEach(inject(function($injector) {
    _scope = $injector.get('$rootScope').$new();
    _q = $injector.get('$q');
    _compile = $injector.get('$compile');
    _timeoutMock = $injector.get('$timeout');
  }));

  describe('criação', function() {
    it('deve ser criado corretamente - sem parâmetros', function() {
      var _html = '<button type="button" alt-botao-loading>!</button>';

      _element = angular.element(_html);
      _compile(_element)(_scope);

      _scope.$digest();

      expect(_element).toBeDefined();
    });

    it('deve ser criado corretamente - com parâmetro de tempo', function() {
      var _html = '<button type="button" alt-botao-loading tempo-loading="1000">!</button>';

      _element = angular.element(_html);
      _compile(_element)(_scope);

      _scope.$digest();

      expect(_element).toBeDefined();
    });
  });

  describe('click', function() {
    describe('click sem volta', function() {
      it('deve deixar o botão disabilitado', function() {
        var _html = '<button type="button" alt-botao-loading>!</button>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();

        _element.click();

        expect(_element.prop('disabled')).toBe(true);
      });
    });

    describe('sem tempo-loading - deve pegar o default', function() {
      it('não deve resetar o estado inicial do element, tempo default ainda não passou', function() {
        var _html = '<button type="button" alt-botao-loading>!</button>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();

        _element.click();

        expect(_element.prop('disabled')).toBe(true);

        _timeoutMock.flush(TEMPO_DEFAULT - 1);

        expect(_element.prop('disabled')).toBe(true);
      });

      it('deve resetar o estado inicial do element, tempo default já passou', function() {
        var _html = '<button type="button" alt-botao-loading>!</button>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();

        _element.click();

        expect(_element.prop('disabled')).toBe(true);

        _timeoutMock.flush(TEMPO_DEFAULT + 1);

        expect(_element.prop('disabled')).toBe(false);
      });

    });

    describe('com tempo-loading - deve pegar o tempo customizado', function() {
      it('não deve resetar o estado inicial do element, tempo customizado ainda não passou', function() {
        var _html = '<button type="button" alt-botao-loading tempo-loading='+TEMPO_CUSTOMIZADO+'>!</button>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();

        _element.click();

        expect(_element.prop('disabled')).toBe(true);

        _timeoutMock.flush(TEMPO_CUSTOMIZADO - 1);

        expect(_element.prop('disabled')).toBe(true);
      });

      it('deve resetar o estado inicial do element, tempo customizado já passou', function() {
        var _html = '<button type="button" alt-botao-loading tempo-loading='+TEMPO_CUSTOMIZADO+'>!</button>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();

        _element.click();

        expect(_element.prop('disabled')).toBe(true);

        _timeoutMock.flush(TEMPO_CUSTOMIZADO + 1);

        expect(_element.prop('disabled')).toBe(false);
      });

    });
  });
});
