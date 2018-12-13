;
"use strict"
    export default function validateName( nameForm ) {
      // ALL TYPE OF SPACES EXCLUDED 
        nameForm.value = nameForm.value.replace( /\s/g,"" );
        if ( /^[a-z]{2,16}$/i.test( nameForm.value ) )  {
              return true;
        } else {
              return false;
        }
      };