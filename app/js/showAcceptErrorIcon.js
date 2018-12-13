;
"use strict"

export default function showAcceptErrorIcon( input, iconAccept, 
  iconError, classVisible, funcCheck ) {
        if (input.value == false) {
          iconAccept.classList.remove(classVisible);
          iconError.classList.remove(classVisible);
        return;
      }
        if (funcCheck(input)) {
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