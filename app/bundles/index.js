import angular from "angular";
// Import an entire module for side effects only, without importing anything.
// This runs the module's global code, but doesn't actually import any values.
import "angular-route";
import componentsProvider from "@app/components/components-provider";
import navigationService from "@app/services/navigation-service";
import './main.scss';
import './index.temp.html';
const appModuleNg = angular.module("app", ["ngRoute"]);

const navigationServiceObj = navigationService();
appModuleNg.factory(navigationServiceObj.serviceId, navigationServiceObj.export);

componentsProvider().forEach(compObj => appModuleNg.component(compObj.name, compObj.comp()));

appModuleNg.config(($routeProvider, $locationProvider) => {
  $routeProvider.when('/', { template: '<home></home>' });
  $routeProvider.when('', { template: '<home></home>' });
  $routeProvider.when('/home', { template: '<home></home>' });
  $routeProvider.when('/contact', { template: '<contact></contact>' });
  $routeProvider.when('/about-us', { template: '<about-us></about-us>' });
  $routeProvider.when('/portfolio', { template: '<portfolio></portfolio>' });
  $routeProvider.otherwise('/home');
  // affects current window.href
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
appModuleNg.controller("rootCtrl", ["$scope", "$location", function ($scope, $location) {
  //$location.path = window.location.pathname;
}]);