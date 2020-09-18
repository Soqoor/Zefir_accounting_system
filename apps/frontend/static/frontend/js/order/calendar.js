'use strict';


if (+current_pathname.replace(/\D+/g,"") == 0) {

    document.getElementById('calendar_div').classList.remove('collapse');

    getData(calendar_api_pathname)
        .then(data => {
            rebuildOrders(data);
        });
}


function rebuildOrders (data) {

    const table_body = document.getElementById('calendar_body');
    const date_planed = document.getElementById('date_planed');
    
    // reset table
    table_body.innerHTML = '';

    data.calendar.forEach (week => {
        const row = document.createElement('tr');
        row.classList.add('d-flex');

        week.forEach (day => {
            const td = document.createElement('td');
            td.classList.add('col', 'text-center', 'unselectable');
            const div = document.createElement('div');
            div.classList.add('d-inline', 'align-top');
            div.textContent = day.day;
            const a = document.createElement('a');
            a.classList.add('badge', 'badge-pill', 'badge-info', 'd-inline', 'float-right', 'align-bottom');
            if (day.count == 0) a.classList.add('invisible');
            a.textContent = day.count;
            a.href = '#';

            td.addEventListener('click', e => {
                date_planed.value = day.isodate;
            });

            td.append(div);
            td.append(a);
            row.append(td);
        });

        table_body.append(row);
    });

}
