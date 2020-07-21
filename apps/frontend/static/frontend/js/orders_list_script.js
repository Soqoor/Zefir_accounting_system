'use strict';

      // navigation buttons
const btn_today = document.getElementById('btn_today'),
      btn_tomorrow = document.getElementById('btn_tomorrow'),
      btn_after_tomorrow = document.getElementById('btn_after_tomorrow'),
      btn_filters = document.getElementById('btn_filters'),
      btn_forgotten = document.getElementById('btn_forgotten'),
      btn_all = document.getElementById('btn_all'),
      
      // pagination bar
      pagination_bar = document.getElementById('pagination_bar'),
      btn_prev = document.getElementById('btn_prev'),
      btn_next = document.getElementById('btn_next'),
      pagination_text_field = document.getElementById('pagination_text_field'),
      
      // buttons collections
      buttons_nav = [btn_today, btn_tomorrow, btn_after_tomorrow, btn_filters, btn_forgotten, btn_all],
      buttons = [btn_today, btn_tomorrow, btn_after_tomorrow, btn_filters, btn_forgotten, btn_all, btn_prev, btn_next];

// links for nav buttons
// const today_link = `/orders/api?max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`,
//       tomorrow_link = `/orders/api?max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`,
//       after_tomorrow_link = `/orders/api?max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`,
//       forgotten_link = `/orders/api?is_sent=false&max_date_planed=${isoDateFromToday(-1)}`,
//       all_link = `/orders/api`;
btn_today.link = `/orders/api?max_date_planed=${isoDateFromToday(0)}&min_date_planed=${isoDateFromToday(0)}`;
btn_tomorrow.link = `/orders/api?max_date_planed=${isoDateFromToday(1)}&min_date_planed=${isoDateFromToday(1)}`;
btn_after_tomorrow.link = `/orders/api?max_date_planed=${isoDateFromToday(2)}&min_date_planed=${isoDateFromToday(2)}`;
btn_forgotten.link = `/orders/api?is_sent=false&max_date_planed=${isoDateFromToday(-1)}`;
btn_all.link = `/orders/api`;
btn_prev.link = '#';
btn_next.link = '#';


// let prev_link = '#',
//     next_link = '#',
//     pagination_text = '#';

// set onclick events for nav buttons
// activateButton(today_link, btn_today, buttons);
// activateButton(tomorrow_link, btn_tomorrow, buttons);
// activateButton(after_tomorrow_link, btn_after_tomorrow, buttons);
// activateButton(forgotten_link, btn_forgotten, buttons);
// activateButton(all_link, btn_all, buttons);
buttons.forEach(function(btn){
    btn.addEventListener('click', setButtonEvent);
});

buttons_nav.forEach(function(btn){
    btn.addEventListener('click', changeButtonActiveState);
});

// Fill page on load
reloadOrders(btn_forgotten.link)
.then(data => {
    if (data.count == 0) {
        btn_forgotten.classList.add('collapse');
        btn_today.classList.add('active');
        reloadOrders(btn_today.link)
        .then(data => rebuildOrders(data));
    }
    else rebuildOrders(data);
});

function isoDateFromToday(number) {
    // returns ISO date + number days from today
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

function changeButtonActiveState (e) {
    switchButton(e.currentTarget, buttons_nav);
}

// function activateButton(url, button, buttons=[]) {
//     button.addEventListener('click', () => {
//         if (buttons) switchButton(button, buttons);
//         reloadOrders(url)
//         .then(data => rebuildOrders(data));
//     });
// }

function switchButton(button, buttons) {
    buttons.forEach(function(item) {
        item.classList.remove('active');
        if (item == button) {
            item.classList.add('active');
            item.blur();
        }
    });
}

async function reloadOrders (url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}

function rebuildOrders (data) {

    document.querySelector('.table_body').innerHTML = '';

    if (data.results.length == 0) {

        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td colspan="7">Нет записей, удовлетворяющих поиску</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    data.results.forEach (({instagram, name, city, date_planed, date_deadline, is_payed, is_sent, orderitems}) => {
        const row = document.createElement('tr');
        
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
                <td>${orderitems}</td>
            </tr>
        `;

        document.querySelector('.table_body').append(row);
    });

    if (!data.next && !data.previous) {

        pagination_bar.classList.add('collapse');

    } else {

        pagination_bar.classList.remove('collapse');
        btn_prev.link = data.previous;
        btn_next.link = data.next;
        pagination_text_field.textContent = `${btn_next.link ? btn_next.link.slice(-1)-1 : Math.ceil(data.count/data.results.length)} 
                                            from 
                                            ${Math.ceil(data.count/data.results.length)}`;

    }

}

