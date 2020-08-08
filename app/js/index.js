import angular from "angular";
import "angular-route";
import componentsProvider from "../components/components-provider";
import navigationService from "../services/navigation-service";
import '../scss/main.scss';
import '../index.temp.html';
import validateEmail from './validateEmail';
import validateName from './validateName';
import checkSubscribtion from './checkSubscribtion';
import navCollapse from './navCollapse';
// INVLUDES VALIDATE EMAIL
import showAcceptErrorIcon from './showAcceptErrorIcon';
   const appModuleNg = angular.module("app", ["ngRoute"]);

   const navigationServiceObj = navigationService();
   appModuleNg.factory(navigationServiceObj.serviceId, navigationServiceObj.export);

   componentsProvider().forEach(compObj => appModuleNg.component(compObj.name, compObj.comp()));

   appModuleNg.config(($routeProvider, $locationProvider) => {
    $routeProvider.when('/', {template: '<home></home>'});
    $routeProvider.when('', {template: '<home></home>'});
    $routeProvider.when('/home', {template: '<home></home>'});
    $routeProvider.when('/contact', {template: '<contact></contact>'});
    $routeProvider.when('/about-us', {template: '<about-us></about-us>'});
    $routeProvider.when('/portfolio', {template: '<portfolio></portfolio>'});
    $routeProvider.otherwise('/home');

    $locationProvider.html5Mode({enabled: true, requireBase: false});
  });
  appModuleNg.controller("rootCtrl", ["$scope", "$location", function($scope, $location) {
      //$location.path = window.location.pathname;
  }]);

	/* let mobileNav = document.querySelectorAll(".link_block");
	let classIn = "js-uncollapsed";
	let classOut = "js-collapsed";
	let burger = document.querySelector(".bigmac");
	let btnSubs = document.querySelector(".formSub__btn");
  let inpSubs = document.querySelector(".formSub__input");
  let inpName = document.querySelector(".connect__input-name");
  let inpMail = document.querySelector(".connect__input-mail"); */
  
	/* burger.addEventListener("click", function ()
		{
			navCollapse(mobileNav,classIn,classOut);
			});

	btnSubs.addEventListener('click',function () {
      if (validateEmail(inpSubs)) {
        checkSubscribtion(inpSubs);
      }}); 

  inpSubs.addEventListener('change', function () {
    
      let iconAccept = document.querySelector(".formSub__wrap-input-icon > .icon__accept");
      let iconError = document.querySelector(".formSub__wrap-input-icon > .icon__error");
      showAcceptErrorIcon( inpSubs, iconAccept, iconError, "visible", validateEmail );
  });

  inpName.addEventListener( 'change', function () {
    
      let iconAccept = document.querySelector(".input-name > .icon__accept");
      let iconError = document.querySelector(".input-name > .icon__error");
      showAcceptErrorIcon( inpName, iconAccept, iconError, "visible", validateName );
  });
  inpMail.addEventListener( 'change', function () {
    
      let iconAccept = document.querySelector(".input-mail > .icon__accept");
      let iconError = document.querySelector(".input-mail > .icon__error");
      showAcceptErrorIcon( inpMail, iconAccept, iconError, "visible", validateEmail );
  }); */