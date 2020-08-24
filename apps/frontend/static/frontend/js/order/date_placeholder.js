'use strict';


// changes empty date fields into text fields with placeholders

const date_payed_placeholder = document.getElementById('date_payed'),
      date_sent_placeholder = document.getElementById('date_sent');


date_payed_placeholder.addEventListener('click', inputTypeChanger);
date_payed_placeholder.addEventListener('focusout', inputTypeChanger);
date_sent_placeholder.addEventListener('click', inputTypeChanger);
date_sent_placeholder.addEventListener('focusout', inputTypeChanger);


function inputTypeChanger (e) {
    if (e.type == 'click') {
        e.target.type = 'date';
    } else if (e.type == 'focusout') {
        if (e.target.value == '') {
            e.target.type = 'text';
        }
    }
}
