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
btn_today.href = `/orders/?is_sent=false&max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`;
btn_tomorrow.href = `/orders/?is_sent=false&max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`;
btn_after_tomorrow.href = `/orders/?is_sent=false&max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`;
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

// set buttons number of orders
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

// datatransfer buttons for testing data
const   datatransfer_btn = document.getElementById('datatransfer_btn'),
        datatransfer_spinner = document.getElementById('datatransfer_spinner'),
        datatransfer_success = document.getElementById('datatransfer_success'),
        datatransfer_danger = document.getElementById('datatransfer_danger');

datatransfer_btn.addEventListener('click', () => {
    datatransfer_btn.blur();
    if (confirm('Это действие очистит все записи в базе данных приложения и восстановит значения по умолчанию, предназначенные для пользовательского тестирования. Продолжить?')) {
        datatransfer_spinner.classList.remove('d-none');
        getData('/api/dataload/')
        .then(data => {
            datatransfer_spinner.classList.add('d-none');
            if (data.status == 200) {
                datatransfer_success.textContent = `Сброс успешно выполнен за ${data.time} секунд`;
                datatransfer_success.classList.remove('d-none');
                setTimeout( () => datatransfer_success.classList.add('d-none'), 5000);
            }
            else {
                datatransfer_danger.classList.remove('d-none');
                setTimeout( () => datatransfer_danger.classList.add('d-none'), 5000);
            }
        });
    }
});

//logout button
const btn_logout = document.getElementById('btn_logout');

btn_logout.addEventListener('click', e => {
    getData(logout_pathname)
    .then(data => {
        window.open(data.url, '_parent');
    });
});

//reset session storage for main page table
const home_btn = document.getElementById('home_btn');

home_btn.addEventListener('click', e => {
    sessionStorage.removeItem('calendar_date');
    sessionStorage.removeItem('calendar_link');
});