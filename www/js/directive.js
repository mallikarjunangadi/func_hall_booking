angular.module('hallBooking.directiv', [])
.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
     
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
})
  .directive('keyboardHandler', function ($window) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            angular.element($window).bind('native.keyboardshow', function() {
                element.addClass('tabs-item-hide');
            });

            angular.element($window).bind('native.keyboardhide', function() {
                element.removeClass('tabs-item-hide');
            });
        }
    };
})
.directive('jhipsterMaxlength', function() {
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          var maxlength = Number(attrs.jhipsterMaxlength);
          function fromUser(text) {
              if (text.length > maxlength) {
                var transformedInput = text.substring(0, maxlength);
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
                return transformedInput;
              } 
              return text;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
      })


.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
         
            function fromUser(text) {
                if (text) {
                    
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})