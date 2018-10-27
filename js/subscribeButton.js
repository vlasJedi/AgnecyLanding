;(function () {
"use strict";
    let btnSubs = document.querySelector(".formSub-wrap__btnSubUser");
    let inpSubs = document.querySelector(".formSub-wrap__inputSubUser");
    btnSubs.addEventListener('click',confFromServ);
    function confFromServ () {
        let xhr = new XMLHttpRequest();
      let formData = new FormData();
      formData.append("email",inpSubs.value)
      xhr.open('POST', 'subscribeUser.php', true);
      /*xhr.open('POST', 'subscribeUser.php', true);*/
      xhr.send(formData);
      xhr.timeout = 3000;
      xhr.ontimeout = function() {
            alert( 'Извините, запрос превысил максимальное время' );
      }
      xhr.onload = function () {

          alert(xhr.responseText);}
      }

    }
   ());