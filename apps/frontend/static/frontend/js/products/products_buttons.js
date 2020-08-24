'use strict';



const btns_dropdown = document.getElementById('navbarDropdownFilters'),
      btn_today = document.getElementById('btn_today'),
      btn_tomorrow = document.getElementById('btn_tomorrow'),
      btn_after_tomorrow = document.getElementById('btn_after_tomorrow'),
      btn_all_unsent = document.getElementById('btn_all_unsent'),
      btn_all = document.getElementById('btn_all'),
      btn_forgotten = document.getElementById('btn_forgotten'),
      btn_prev = document.getElementById('btn_prev'),
      btn_next = document.getElementById('btn_next'),
      buttons = [btn_today, btn_tomorrow, btn_after_tomorrow, btn_forgotten, btn_all_unsent, btn_all, btn_prev, btn_next];


// set href links for buttons
btn_today.href = window.location.pathname + `?max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`;
btn_tomorrow.href = window.location.pathname + `?max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`;
btn_after_tomorrow.href = window.location.pathname + `?max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`;
btn_forgotten.href = window.location.pathname + `?is_sent=false&max_date_planed=${isoDateFromToday(-1)}`;
btn_all_unsent.href = window.location.pathname + `?is_sent=false`;
btn_all.href = window.location.pathname;

// returns ISO date + number days from today
function isoDateFromToday(number) {
    let target_day = new Date();
    target_day.setDate(target_day.getDate() + number);
    target_day.setHours(target_day.getHours() - target_day.getTimezoneOffset()/60);
    return target_day.toISOString().substring(0,10);
}


// set events to change dropdown title
buttons.forEach(function(btn){
    btn.addEventListener('click', saveLastUsedButton);
});

function saveLastUsedButton (e) {
    if (!e.currentTarget.classList.contains('page-link')) sessionStorage.setItem('last_used_button', e.currentTarget.textContent);
    if (e.currentTarget.href != '#') sessionStorage.setItem('last_used_url', e.currentTarget.href);
}