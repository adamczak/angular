describe('strings', function() {
	var elem, scope, compiled, compile;

	beforeEach(module('adamczak.strings'));

	beforeEach(inject(function($rootScope, $compile, $timeout) {
		compile = $compile;
		scope = $rootScope;
		timeout = $timeout;
	}));
 
	var compileAndDigest = function(html) {
		elem = angular.element(html);
		compiled = compile(elem);
		compiled(scope);
		scope.$digest();
	};

 	describe("alaWrap with prefix only", function() {
 		it("should set the element innerText to be the prefix + string if not empty and a prefix is defined", function() {
 			scope.value = "test";
			compileAndDigest('<span wrapvalue="value" prefix="("></span>');
			expect(elem.text()).toBe("(test");
		});

 		it("should not add the prefix if the element text is empty", function() {
 			scope.value = "";
			compileAndDigest('<span wrapvalue="value" prefix="(" ></span>');
			expect(elem.text()).toBe("");
 		});

 		it("should not add the prefix if the element text is whitespace", function() {
 			scope.value = "   ";
			compileAndDigest('<span wrapvalue="value" prefix="("></span>');
			expect(elem.text()).toBe(scope.value);
 		});
 	});

 	describe("alaWrap with suffix only", function() {
 		it("should set the element innerText to be the string + suffix if not empty and a suffix is defined", function() {
 			scope.value = "test";
			compileAndDigest('<span wrapvalue="value" suffix=")"></span>');
			expect(elem.text()).toBe("test)");
		});

 		it("should not add the suffix if the element text is empty", function() {
 			scope.value = "";
			compileAndDigest('<span wrapvalue="value" suffix=")"></span>');
			expect(elem.text()).toBe("");
 		});

 		it("should not add the suffix if the element text is whitespace", function() {
 			scope.value = "   ";
			compileAndDigest('<span wrapvalue="value" suffix=")"></span>');
			expect(elem.text()).toBe(scope.value);
 		});
 	});

 	describe("alaWrap with both prefix and suffix", function() {
 		it("should set the element innerText to be the prefix + string + suffix if not empty and a both are defined", function() {
 			scope.value = "test";
			compileAndDigest('<span wrapvalue="value" prefix="(" suffix=")"></span>');
			expect(elem.text()).toBe("(test)");
		});
 	});

 	it("alaWrap should not change the value of the model passed", function() {
 			scope.value = "test";
			compileAndDigest('<span wrapvalue="value" prefix="(" suffix=")"></span>');
			expect(scope.value).toBe("test");
 	});

 	describe("truncate filter", function() {
 		var filter;
 		beforeEach(inject(function(truncateFilter) {
			filter = truncateFilter;
		}));

 		it("should return at most the specified number of characters", function() {
 			var string = "xxxxxxxxxxxxxxxxxxxxxxxx";
 			var actual = filter(string, 5);
 			expect(actual.length).toBe(5);
 		});

 		it("should append a suffix if greater than specified length and a suffix is passed", function() {
 			var string = "xxxxxxxxxxxxxxxxxxxxxxxx";
 			var actual = filter(string, 5, "...");
 			expect(actual).toBe("xxxxx...");
 		});

 		it("should default to 25 chars", function() {
 			var string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 			var actual = filter(string);
 			expect(actual.length).toBe(25);
 		});
 	});

});
