;
	"use strict";
import '../scss/main.scss';
import '../index.temp.html';
import validateEmail from './validateEmail';
import validateName from './validateName';
import checkSubscribtion from './checkSubscribtion';
import navCollapse from './navCollapse';
// INVLUDES VALIDATE EMAIL
import showAcceptErrorIcon from './showAcceptErrorIcon';


 (function () {


	let mobileNav = document.querySelectorAll(".link_block");
	let classIn = "js-uncollapsed";
	let classOut = "js-collapsed";
	let burger = document.querySelector(".bigmac");
	let btnSubs = document.querySelector(".formSub__btn");
  let inpSubs = document.querySelector(".formSub__input");
  let inpName = document.querySelector(".connect__input-name");
  let inpMail = document.querySelector(".connect__input-mail");
  
	burger.addEventListener("click", function ()
		{
			navCollapse(mobileNav,classIn,classOut);
			});

	btnSubs.addEventListener('click',function () {
      if (validateEmail(inpSubs)) {
        checkSubscribtion(inpSubs);
      }}); 

  inpSubs.addEventListener('change', function () {
      /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
        ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
        BECOME UNDEFINED */ 
      let iconAccept = document.querySelector(".formSub__wrap-input-icon > .icon__accept");
      let iconError = document.querySelector(".formSub__wrap-input-icon > .icon__error");
      showAcceptErrorIcon( inpSubs, iconAccept, iconError, "visible", validateEmail );
  });

  inpName.addEventListener( 'change', function () {
      /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
        ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
        BECOME UNDEFINED */ 
      let iconAccept = document.querySelector(".input-name > .icon__accept");
      let iconError = document.querySelector(".input-name > .icon__error");
      showAcceptErrorIcon( inpName, iconAccept, iconError, "visible", validateName );
  });
  inpMail.addEventListener( 'change', function () {
      /* ICONS SHOULD BE SELECTED AT CALL TIME BECAUSE
        ICONS, AFTER LOAD, SWITCH TO SVG SO SELECTORS
        BECOME UNDEFINED */ 
      let iconAccept = document.querySelector(".input-mail > .icon__accept");
      let iconError = document.querySelector(".input-mail > .icon__error");
      showAcceptErrorIcon( inpMail, iconAccept, iconError, "visible", validateEmail );
  });
}());