angular.module('adamczak.strings', [])

.service('stringService', function() {
	this.trim = function(value) {
		if(value)
		{
			return value.replace(/^\s+|\s+$/,'');
		}
	};
	this.prefix = function(value,prefix) {
		if(value && this.trim(value).length > 0)
		{
			return prefix + value;
		}
		return value;
	};
	this.suffix = function(value,suffix)
	{
		if(value && this.trim(value).length > 0)
		{
			return value + suffix;
		}
		return value;
	};
})

.directive('wrapvalue', function(stringService) {
	return {
		restrict: "A",
		scope: {
			value: "=wrapvalue",
		},
		link: function(scope,elem,attrs) {
			scope.$watch('value', function(newVal,oldVal) {
				var prefixed = stringService.prefix(newVal, elem.attr('prefix') || '');
				var suffixed = stringService.suffix(prefixed, elem.attr('suffix') || '');
				elem.text(suffixed);
			});
		}
	};
})

.filter("truncate", function(stringService) {
	return function(value, maxLength, suffix) {
		maxLength = maxLength || 25;
		suffix = suffix || '';

		if(value.length > maxLength)
		{
			return stringService.suffix(value.substring(0,maxLength),suffix);
		}

		return value;
	};
});