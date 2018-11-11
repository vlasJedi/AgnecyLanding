;
"use strict"
    export default function validateEmail( emailForm ) {
      // ALL TYPE OF SPACES EXCLUDED 
        emailForm.value = emailForm.value.replace( /\s/g,"" );

         // CHECK AMOUNT OF @, SHOULD BE ONLY 1
        if ( ( /@/.test(emailForm.value) &&
            emailForm.value.match( /@/g ).length == 1) &&
          // CHECK AFTER EACH DOT ALLOWED CHARS
           !/\.(?![\w!#$%&'*+/=?^`{|}~-])/.test( emailForm.value ) &&
          // CHECK DOT AT START OF EMAIL
           !( emailForm.value[0]==="." ) &&
          // CHECK TEMPLATE OF EMAIL
           /^[\w!#$%&'*+/=?^`{|}~.-]+?@\w+?\.\w{2,}?$/.test( emailForm.value )
           ) {
              return true;
        } else {
              return false;
        }
      };
