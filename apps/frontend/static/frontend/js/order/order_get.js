'use strict';


// reload and rebuild order and orderitems on page load

const   order_id = +current_pathname.replace(/\D+/g,""),
        order_title = document.getElementById('order_title'),
        div_items = document.getElementById('div_items'),
        input_date_created = document.getElementById('date_created'),
        input_date_planed = document.getElementById('date_planed'),
        input_date_deadline = document.getElementById('date_deadline'),
        input_instagram = document.getElementById('instagram'),
        input_name = document.getElementById('name'),
        input_phone = document.getElementById('phone'),
        input_city = document.getElementById('city'),
        input_np_department = document.getElementById('np_department'),
        input_date_payed = document.getElementById('date_payed'),
        input_date_sent = document.getElementById('date_sent');


if (order_id == 0){
    order_title.textContent = 'Новый заказ';
    order_title.classList.add('text-danger');
} else {
    div_items.classList.remove('collapse');
    getData(current_api_pathname)
    .then(data => {
        rebuildOrder(data);
    });
    getData(items_api_pathname + '?order=' + order_id)
    .then(data => {
        rebuildItems(data);
    });
}


function rebuildOrder (data) {
    input_date_created.value = data.date_created;
    input_date_planed.value = data.date_planed;
    input_date_deadline.value = data.date_deadline;
    input_instagram.value = data.instagram;
    input_name.value = data.name;
    input_phone.value = data.phone;
    input_city.value = data.city;
    input_np_department.value = data.np_department;
    input_date_payed.value = data.date_payed;
    input_date_sent.value = data.date_sent;
    if (data.date_payed) input_date_payed.type = 'date';
    if (data.date_sent) input_date_sent.type = 'date';

    let event = new Event("blur");
    input_phone.dispatchEvent(event); // trigger for phone mask
}


function rebuildItems (data) {
    let sum = 0;
    
    data.results.forEach (({id, catalog_text, product_text, description, amount, price, is_ready}) => {

        const row = document.createElement('tr');

        sum += price * amount;
        
        if (is_ready) row.classList.add("table-success");
        row.classList.add('table_row', 'unselectable');
        row.id = id;

        row.innerHTML = `
            <tr>
                <td>${catalog_text}</td>
                <td>${product_text}</td>
                <td>${description}</td>
                <td>${amount}</td>
                <td>${price}</td>
                <td>${amount * price}</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    });

    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>${sum}</th>
        </tr>
    `;
    document.querySelector('.table_body').append(row);

    let event = new Event("items_loaded");
    document.dispatchEvent(event); // trigger for addEventListeners on order items
}
