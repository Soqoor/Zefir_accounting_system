'use strict';

const date_payed = document.getElementById('date_payed'),
      date_sent = document.getElementById('date_sent');

date_payed.addEventListener('click', inputTypeChanger);
date_payed.addEventListener('focusout', inputTypeChanger);
date_sent.addEventListener('click', inputTypeChanger);
date_sent.addEventListener('focusout', inputTypeChanger);


function inputTypeChanger (e) {
    if (e.type == 'click') {
        e.target.type = 'date';
    } else if (e.type == 'focusout') {
        if (e.target.value == '') {
            e.target.type = 'text';
        }
    }
}
