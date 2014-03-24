var app = angular.module("JLApp", []);


/**
 * Basics - Simple Controller
 * @param $scope
 */
function ToggleCtrl($scope) {
	$scope.sichtbar = true;
	$scope.toggle = function() {
		$scope.sichtbar = !$scope.sichtbar;
	};
}


/**
 * Basics - Simple Directive
 */
app.directive("showme", function() {
	return {
		link: function(scope, element, attributes) {
			scope.$watch(attributes.showme, function(value){
				element.css('display', value ? '' : 'none');
			});
		}
	};
});


/**
 * Controller - Datum Controller
 */
var DatumCtrl = function($scope) {
	$scope.datum = new Date();
};


/**
 * Controller - Sqr Controller
 */
var SqrCtrl = function($scope) {
	$scope.zahl = 1;
	
	$scope.getSqr = function() {
		return $scope.zahl * $scope.zahl;
	};
};


/**
 * Controller - Verschachtelte C. (1)
 */
app.controller("ElternCtrl", function($scope) {
	$scope.name = "Tom";
});

/**
 * Controller - Verschachtelte C. (2)
 */
app.controller("KindCtrl", function($scope) {
	$scope.name = "Fritz";
});


/**
 * Controller f. ngRepeat-Beispiele
 */
app.controller("DevsCtrl", function($scope) {
	$scope.devs = [
	    { name: "Lisa", speciality: "HTML/JS" },
	    { name: "Kim", speciality: ".Net" },
	    { name: "Berta", speciality: "Java" },
	    { name: "Xaver", speciality: "AngularJS" }
	];
});


/**
 * Filter "entferne"
 */
app.filter("entferne", function() {
	return function(input, entferne) {
		var erg = [];
		for (var i=0; i<input.length; i++) {
			if (input[i].name !== entferne) {
				erg.push(input[i]);
			}
		}
		return erg;
	};
});


/**
 * Superheld Directive
 */
app.directive('superheld', function() {
	return {
		restrict: 'E',
		template: '<div>SUPER-<span ng-transclude></span>!!!</div>',
		transclude: true
	};
});


/**
 * Timer Controller
 */
function TimerCtrl($scope, $timeout) {
	$scope.timer = 10;

	$scope.start = function() {
		var stop = $timeout(function(){
			if($scope.timer > 0){
				$scope.timer = $scope.timer - 1;
				$scope.start();
			} else {
				$timeout.cancel(stop);
			}
		}, 1000);
	};
};


/**
 * Einfacher Service
 */
app.factory("OSService", function() {
	var os = [ "Linux", "MacOS", "Windows" ];
	return {
		all : function() {
			return os;
		},
		first : function() {
			return os[0];
		}
	};
});

app.controller("OSAllCtrl", function($scope, OSService) {
	$scope.oss = OSService.all();
});

app.controller("OSFirstCtrl", function($scope, OSService) {
	$scope.firstOS = OSService.first();
});


/**
 * Buecher Controller
 */
app.controller("BuecherCtrl", function($scope, $http) {
	$http.get('exampledata/buecher.json').
	success(function(data, status, headers, config) {
		$scope.buecher = data;
	}).
	error(function(data, status, headers, config) {
		// log error
	});
});


