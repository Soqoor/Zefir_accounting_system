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
btn_today.href = `/orders/?max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`;
btn_tomorrow.href = `/orders/?max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`;
btn_after_tomorrow.href = `/orders/?max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`;
btn_forgotten.href = `/orders/?is_sent=false&max_date_planed=${isoDateFromToday(-1)}`;
btn_all_unsent.href = `/orders/?is_sent=false`;
btn_all.href = '/orders/';

btns_dropdown.addEventListener('click', setOrdersButtonsText);

// returns ISO date + number days from today
function isoDateFromToday(number) {
    let target_day = new Date();
    target_day.setDate(target_day.getDate() + number);
    target_day.setHours(target_day.getHours() - target_day.getTimezoneOffset()/60);
    return target_day.toISOString().substring(0,10);
}

function setOrdersButtonsText () {
    getData(count_api_pathname)
    .then(data => {
        if (data.orders_forgotten == 0) {
            btn_forgotten.classList.add('collapse');
        } else {
            btn_forgotten.classList.remove('collapse');
        }
        btn_today.textContent = `Сегодня (${data.orders_today})`;
        btn_tomorrow.textContent = `Завтра (${data.orders_tomorrow})`;
        btn_after_tomorrow.textContent = `Послезавтра (${data.orders_aftertomorrow})`;
        btn_all_unsent.textContent = `Открытые (${data.orders_unsent})`;
        btn_forgotten.textContent = `Просроченные (${data.orders_forgotten})`;
        btn_all.textContent = `Все заказы (${data.orders_all})`;
    });
}