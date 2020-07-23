'use strict';

      // navigation buttons
const btns_dropdown = document.getElementById('navbarDropdownFilters'),
      btn_today = document.getElementById('btn_today'),
      btn_tomorrow = document.getElementById('btn_tomorrow'),
      btn_after_tomorrow = document.getElementById('btn_after_tomorrow'),
      btn_all = document.getElementById('btn_all'),
      btn_forgotten = document.getElementById('btn_forgotten'),
      
      // pagination bar
      pagination_bar = document.getElementById('pagination_bar'),
      btn_prev = document.getElementById('btn_prev'),
      btn_next = document.getElementById('btn_next'),
      pagination_text_field = document.getElementById('pagination_text_field'),
      li_prev = document.getElementById('li_prev'),
      li_next = document.getElementById('li_next'),
      
      // buttons collections
      nav_buttons = [btn_today, btn_tomorrow, btn_after_tomorrow, btn_forgotten, btn_all],
      buttons = [btn_today, btn_tomorrow, btn_after_tomorrow, btn_forgotten, btn_all, btn_prev, btn_next];

// set default links for buttons
btn_today.link = `/orders/api?max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`;
btn_tomorrow.link = `/orders/api?max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`;
btn_after_tomorrow.link = `/orders/api?max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`;
btn_forgotten.link = `/orders/api?is_sent=false&max_date_planed=${isoDateFromToday(-1)}`;
btn_all.link = `/orders/api`;
btn_prev.link = '#';
btn_next.link = '#';

// ONLOAD
// set events to reload new data
buttons.forEach(function(btn){
    btn.addEventListener('click', setButtonEvent);
});

// set events to change dropdown title
nav_buttons.forEach(function(btn){
    btn.addEventListener('click', setDropdownTitle);
});

// reload page last stanse
if (sessionStorage.getItem('last_used_button')) {
    btns_dropdown.textContent = sessionStorage.getItem('last_used_button');
    reloadOrders(sessionStorage.getItem('last_used_url'))
    .then(data => {
        rebuildOrders(data);
    });
} else { // or load default page
    reloadOrders(btn_forgotten.link)
    .then(data => {
        if (data.count == 0) {
            btn_forgotten.classList.add('collapse');
            sessionStorage.setItem('btn_forgotten_collapse', true);
            reloadOrders(btn_today.link)
            .then(data => rebuildOrders(data));
            btns_dropdown.textContent = 'Сегодня';
        } else {
            rebuildOrders(data);
            btns_dropdown.textContent = 'Просроченные';
        }
    });
}

// returns ISO date + number days from today
function isoDateFromToday(number) {
    let target_day = new Date();
    target_day.setDate(target_day.getDate() + number);
    target_day.setHours(target_day.getHours() - target_day.getTimezoneOffset()/60);
    return target_day.toISOString().substring(0,10);
}

function setButtonEvent (e) {
    e.preventDefault();
    if (e.currentTarget.link != null) {
        reloadOrders(e.currentTarget.link)
        .then(data => rebuildOrders(data));
    }
    e.currentTarget.blur();
}

function setDropdownTitle (e) {
    btns_dropdown.textContent = e.currentTarget.textContent;
    sessionStorage.setItem('last_used_button', e.currentTarget.textContent);
}

async function reloadOrders (url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    sessionStorage.setItem('last_used_url', url);

    return await res.json();
}

function rebuildOrders (data) {

    document.querySelector('.table_body').innerHTML = '';

    if (data.results.length == 0) {

        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td colspan="7">В этом месте сейчас пусто</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    data.results.forEach (({id, instagram, name, city, date_planed, date_deadline, is_payed, is_sent, orderitems}) => {
        const row = document.createElement('tr');

        let orderitems_text = "";
        orderitems.forEach(function(item){
            if (orderitems_text) orderitems_text += ' ';
            orderitems_text += item;
        });
        
        if (is_sent) row.classList.add("table-success");
        if (date_planed < Date.now && !is_sent) row.classList.add("table-danger");

        row.innerHTML = `
            <tr>
                <td>${instagram}</td>
                <td>${name}</td>
                <td>${city}</td>
                <td>${date_planed}</td>
                <td>${date_deadline}</td>
                ${is_payed ? '<td class="text-success">Да</td>' : '<td class="text-danger">Нет</td>'}
                <td>${orderitems_text}</td>
            </tr>
        `;

        row.addEventListener('click', () => {
            window.open(`${id}/`, '_parent');
        });

        document.querySelector('.table_body').append(row);
    });

    pagination_bar.classList.remove('collapse');
    li_next.classList.remove('disabled');
    li_prev.classList.remove('disabled');
    if (!data.next && !data.previous) {pagination_bar.classList.add('collapse');}
    if (!data.next) {li_next.classList.add('disabled');}
    if (!data.previous) {li_prev.classList.add('disabled');}
    btn_prev.link = data.previous;
    btn_next.link = data.next;
    pagination_text_field.textContent = `${data.page} из ${data.pages}`;


}
