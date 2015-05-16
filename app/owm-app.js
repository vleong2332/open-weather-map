var DEBUG = true;

var OWM = angular.module('OWMapp', ['ngRoute']);


OWM.value('owmCities', ['New York', 'Dallas', 'Atlanta', 'Portland', 'Seattle']);


OWM.run(function($rootScope, $location, $timeout) {
	$rootScope.$on('$routeChangeError', function() {
		if(DEBUG) console.log('Run: change to error');
		$location.path('/error');
	});
	//
	$rootScope.$on('$routeChangeStart', function() {
		if (DEBUG) console.log('Run: isLoading true');
		$rootScope.isLoading = true;
	});
	//
	$rootScope.$on('$routeChangeSuccess', function() {
		$timeout(function() {
			$rootScope.isLoading = false;
		}, 200);
	});
});


OWM.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html',
				controller: 'HomeCtrl'
			})
			.when('/cities/:city', {
				templateUrl: 'city.html',
				controller: 'CityCtrl',
				resolve: {
					city: function($route, omwFindCity) {
						var city = $route.current.params.city;
						if (owmCities.indexOf(city) == -1) {
							// $location.path('/error');
							if(DEBUG) console.log('Config: city not found');
							return omwFindCity(city);
						}
					}
				}
			})
			.when('/error', {
				templateUrl: 'error.html',
				controller: 'ErrorCtrl'
			})
			.otherwise('/error');
	}
]);


OWM.controller('HomeCtrl', ['$scope', function($scope) {
	//
}]);


OWM.controller('CityCtrl', ['$scope', 'city', function($scope, city) { /* Which city is referred here? */
	$scope.city = city;
}]);


OWM.controller('ErrorCtrl', ['$scope', function($scope) {
	//
	console.log('ErrorCtrl is called');
}]);