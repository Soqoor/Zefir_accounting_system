'use strict';

const input_date_created = document.getElementById('date_created'),
      input_date_planed = document.getElementById('date_planed'),
      input_date_deadline = document.getElementById('date_deadline'),
      input_instagram = document.getElementById('instagram'),
      input_name = document.getElementById('name'),
      input_phone = document.getElementById('phone'),
      input_city = document.getElementById('city'),
      input_np_department = document.getElementById('np_department'),
      input_date_payed = document.getElementById('date_payed'),
      input_date_sent = document.getElementById('date_sent');

const pathname = window.location.pathname,
      api_pathname = `/api${pathname}`,
      order_id = +pathname.replace(/\D+/g,"");


// reload order on page load
getData(api_pathname)
.then(data => {
    rebuildOrder(data);
});

//reloar orderitems on page load
getData(`/api/items/?order=${order_id}`)
.then(data => {
    rebuildItems(data);
});


async function getData (url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
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
    
    data.results.forEach (({product, description, amount, price, is_ready}) => {

        const row = document.createElement('tr');

        sum += price * amount;
        
        if (is_ready) row.classList.add("table-success");

        row.innerHTML = `
            <tr>
                <td>${product.catalog.category}</td>
                <td>${product.name}</td>
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
}