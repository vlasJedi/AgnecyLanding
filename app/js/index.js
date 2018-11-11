;
	"use strict";
import '../scss/main.scss';
import '../index.temp.html';
import validateEmail from './validateEmail';
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
      let iconAccept = document.querySelector(".icon__accept");
      let iconError = document.querySelector(".icon__error");
      showAcceptErrorIcon( inpSubs, iconAccept, iconError, "visible");
    });
}());