'use strict';


const table = document.getElementById('orders_body');
const title_h2 = document.getElementById('title_h2');
const title_h5 = document.getElementById('title_h5');


rebuild_mainpage_table();
document.addEventListener('calendar_trigger', rebuild_mainpage_table);

function rebuild_mainpage_table() {
    const calendar_date = sessionStorage.getItem('calendar_date');
    if (calendar_date == 'missed') {
        title_h5.textContent = '';
        title_h2.textContent = `Просроченные заказы`;
    } else if (calendar_date) {
        title_h5.textContent = '';
        title_h2.textContent = `Заказы на ${calendar_date}`;
    }

    let calendar_link = sessionStorage.getItem('calendar_link');
    calendar_link = '/api' + calendar_link;
    getData(calendar_link)
    .then(data => {
        if (!data.results[0]) {
            title_h5.textContent = 'Отправок больше нет. Можно открывать винчик!';
        }
        rebuild_table(data);
    });
}

function rebuild_table(data) {
    table.innerHTML = '';
    data.results.forEach(order => {
        add_order_row(order);
        order.orderitems.forEach(item => {
            add_item_row(item);
        });
    });
}

function add_order_row(order) {
    const row = document.createElement('tr');
    row.classList.add('unselectable');
    const content = document.createElement('th');
    content.colSpan = 2;
    content.textContent = `${order.name} - ${order.city}`;
    row.append(content);
    const btn = document.createElement('th');
    btn.colSpan = 2;
    btn.textContent = 'отметить отправку';
    btn.classList.add('text-white');
    row.append(btn);
    content.addEventListener('click', () => {
        window.open(`/orders/${order.id}/`, '_parent');
    });
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('text-success');
        btn.classList.remove('text-white');
    });
    btn.addEventListener('mouseleave', () => {
        btn.classList.add('text-white');
        btn.classList.remove('text-success');
    });
    btn.addEventListener('click', () => {

        if (localStorage.getItem('advanced_user') != 'true') {
            if (!confirm('отметить заказ как отправленный?')) {
                return;
            }
        }

        const data = {
            'is_sent' : true,
            'date_sent' : new Date().toISOString().substring(0,10)
        };
        const json = JSON.stringify(data);
        postData(`/api/orders/${order.id}/`, 'PATCH', json)
        .then(res => {
            if (res.status == 200) document.location.reload(); else console.log(res);
        });
    });

    table.append(row);
}

function add_item_row(item) {
    const row = document.createElement('tr');
    row.classList.add('unselectable');
    const cat = document.createElement('td');
    const pro = document.createElement('td');
    const des = document.createElement('td');
    const amo = document.createElement('td');
    cat.textContent = item.catalog_text;
    pro.textContent = item.product_text;
    des.textContent = item.description;
    amo.textContent = item.amount;
    row.append(cat);
    row.append(pro);
    row.append(des);
    row.append(amo);

    row.addEventListener('click', () => {
        window.open(`/orders/${item.order}/`, '_parent');
    });

    table.append(row);
}