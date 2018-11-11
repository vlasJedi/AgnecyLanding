;
"use strict"
export default function checkSubscribtion( input ) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("email",input.value)
        // PHP FILE TO HANDLE SUBSCRIBTION
        xhr.open('POST', './subscribeUser.php', true);
        xhr.send(formData);
        xhr.timeout = 3000;
        xhr.ontimeout = function() {
            return false;
        }
        xhr.onload = function () {
          if (xhr.responseText) {
            alert("You succesfully subscribed !");
          } else {
            alert("You are already subscribed !");
          }
        }
    };