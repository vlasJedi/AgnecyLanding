;
"use strict"
import validateEmail from './validateEmail';

export default function showAcceptErrorIcon( input, iconAccept, 
  iconError, classVisible) {
        if (input.value == false) {
          iconAccept.classList.remove(classVisible);
          iconError.classList.remove(classVisible);
        return;
      }
        if (validateEmail(input)) {
          if (!iconAccept.classList.contains(classVisible)) {
            iconAccept.classList.add(classVisible);
          }
          iconError.classList.remove(classVisible);
        } else {
            if (!iconError.classList.contains(classVisible)) {
              iconError.classList.add(classVisible);
          }
          iconAccept.classList.remove(classVisible);
        }
      };