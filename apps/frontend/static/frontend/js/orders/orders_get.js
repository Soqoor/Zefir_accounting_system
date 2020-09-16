'use strict';


// reload and rebuild orders list on page load

const   orders_pagination_bar = document.getElementById('pagination_bar'),
        orders_pagination_bar_li_prev = document.getElementById('li_prev'),
        orders_pagination_bar_li_next = document.getElementById('li_next'),
        orders_pagination_bar_btn_prev = document.getElementById('btn_prev'),
        orders_pagination_bar_btn_next = document.getElementById('btn_next'),
        orders_pagination_bar_text_field = document.getElementById('pagination_text_field');

let link = '';
if (window.location.pathname.includes('search')) {
    link = search_api_pathname;
} else {
    link = order_api_pathname;
}

getData(link + window.location.search)
    .then(data => {
        rebuildOrders(data);
    });


function rebuildOrders (data) {

    // reset table
    document.querySelector('.table_body').innerHTML = '';

    // empty row if table is empty
    if (data.results.length == 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td colspan="7">В этом месте сейчас пусто</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    data.results.forEach (order => {
        const tooltip = createTooltip(order);
        const row = createRow(order, tooltip);
        document.querySelector('.table_body').append(row);
    });

    // инициализации подсказок для всех элементов на странице, имеющих атрибут data-toggle="tooltip"
    $('[data-toggle="tooltip"]').tooltip({html: true, 'delay': { show: 500, hide: 0 }});

    rebuildPaginationBar(data);
    
}

function createTooltip(order) {
    let tooltip = '';
    order.orderitems.forEach (({product_text, amount, is_ready}) => {
        if (is_ready || order.is_sent) {
            tooltip += `<div class="text-success">${product_text} ${amount}шт.</div>`;
        } else {
            tooltip += `<div>${product_text} ${amount}шт.</div>`;
        }
    });
    return tooltip;
}

function createRow(order, tooltip) {
    const row = document.createElement('tr');
    row.classList.add("unselectable");
    row.dataset.toggle = 'tooltip';
    row.dataset.placement = 'bottom';
    row.title = tooltip;
    row.addEventListener('click', () => {
        window.open(`/orders/${order.id}/`, '_parent');
    });

    const td_instagram = document.createElement('td');
    td_instagram.textContent = order.instagram;
    row.append(td_instagram);

    const td_name = document.createElement('td');
    td_name.textContent = order.name;
    row.append(td_name);

    const td_city = document.createElement('td');
    td_city.textContent = order.city;
    row.append(td_city);

    const td_date_planed = document.createElement('td');
    if (order.is_sent) {
        td_date_planed.textContent = 'отправлено';
        td_date_planed.classList.add('text-success');
    } else {
        td_date_planed.textContent = new Date(order.date_planed).toLocaleDateString();
        if (deadlineFromIsoString(order.date_planed) < new Date()) {
            td_date_planed.classList.add('text-danger');
        }
    }
    if (!order.is_payed) td_date_planed.textContent += ' Не оплачено';
    row.append(td_date_planed);

    return row;
}

function deadlineFromIsoString(string) {
    let deadline = new Date(string);
    deadline.setHours(deadline.getHours() + deadline.getTimezoneOffset()/60);
    deadline.setDate(deadline.getDate() + 1);
    return deadline;
}