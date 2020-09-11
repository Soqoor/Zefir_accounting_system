'use strict';
      

const   orders_pagination_bar = document.getElementById('pagination_bar'),
        orders_pagination_bar_li_prev = document.getElementById('li_prev'),
        orders_pagination_bar_li_next = document.getElementById('li_next'),
        orders_pagination_bar_btn_prev = document.getElementById('btn_prev'),
        orders_pagination_bar_btn_next = document.getElementById('btn_next'),
        orders_pagination_bar_text_field = document.getElementById('pagination_text_field');


getData(calendar_api_pathname)
    .then(data => {
        rebuildOrders(data);
    });


function rebuildOrders (data) {

    const table_body = document.querySelector('.table_body');
    
    // reset table
    table_body.innerHTML = '';

    if (data.missed.count) {
        const row = document.createElement('tr');
        row.classList.add('d-flex');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.classList.add('col', 'text-center');
        const div = document.createElement('div');
        div.classList.add('d-inline', 'align-top');
        div.textContent = 'Просроченные';
        const a = document.createElement('a');
        a.classList.add('badge', 'badge-pill', 'badge-danger', 'd-inline', 'float-right', 'align-bottom');
        a.textContent = data.missed.count;
        a.href = data.missed.link;
        td.append(div);
        td.append(a);
        row.append(td);
        table_body.append(row);
    }

    data.calendar.forEach (week => {
        const row = document.createElement('tr');
        row.classList.add('d-flex');

        week.forEach (day => {
            const td = document.createElement('td');
            td.classList.add('col', 'text-center');
            const div = document.createElement('div');
            div.classList.add('d-inline', 'align-top');
            div.textContent = day.day;
            const a = document.createElement('a');
            a.classList.add('badge', 'badge-pill', 'badge-info', 'd-inline', 'float-right', 'align-bottom');
            if (day.count == 0) a.classList.add('invisible');
            a.textContent = day.count;
            a.href = day.link;
            td.append(div);
            td.append(a);
            row.append(td);
        });

        table_body.append(row);
    });

}
