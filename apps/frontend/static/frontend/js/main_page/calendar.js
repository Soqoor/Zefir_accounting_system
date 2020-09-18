'use strict';
      

getData(calendar_api_pathname)
    .then(data => {
        rebuildOrders(data);
    });


function rebuildOrders (data) {

    const table_body = document.getElementById('calendar_body');
    
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

        // delete this block to make <a></a> directing to orders page instead reload main page
        a.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.blur();
            sessionStorage.setItem('calendar_link', data.missed.link);
            sessionStorage.setItem('calendar_date', 'missed');
            let event = new Event("calendar_trigger");
            document.dispatchEvent(event);
        });

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

            // delete this block to make <a></a> directing to orders page instead reload main page
            a.addEventListener('click', (e) => {
                e.preventDefault();
                e.target.blur();
                sessionStorage.setItem('calendar_link', day.link);
                sessionStorage.setItem('calendar_date', day.date);
                let event = new Event("calendar_trigger");
                document.dispatchEvent(event);
            });

            td.append(div);
            td.append(a);
            row.append(td);
        });

        table_body.append(row);
    });

    if (data.long_term.count) {
        const row = document.createElement('tr');
        row.classList.add('d-flex');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.classList.add('col', 'text-center');
        const div = document.createElement('div');
        div.classList.add('d-inline', 'align-top');
        div.textContent = 'Более поздние заказы';
        const a = document.createElement('a');
        a.classList.add('badge', 'badge-pill', 'badge-info', 'd-inline', 'float-right', 'align-bottom');
        a.textContent = data.long_term.count;
        a.href = data.long_term.link;

        // delete this block to make <a></a> directing to orders page instead reload main page
        a.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.blur();
            sessionStorage.setItem('calendar_link', data.long_term.link);
            sessionStorage.setItem('calendar_date', 'следующие месяцы');
            let event = new Event("calendar_trigger");
            document.dispatchEvent(event);
        });

        td.append(div);
        td.append(a);
        row.append(td);
        table_body.append(row);
    }

}
