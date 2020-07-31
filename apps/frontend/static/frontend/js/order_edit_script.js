'use strict';

const csrftoken = getCookie('csrftoken');

const form = document.getElementById('order_form'),
      input_date_created = document.getElementById('date_created'),
      input_date_planed = document.getElementById('date_planed'),
      input_date_deadline = document.getElementById('date_deadline'),
      input_instagram = document.getElementById('instagram'),
      input_name = document.getElementById('name'),
      input_phone = document.getElementById('phone'),
      input_city = document.getElementById('city'),
      input_np_department = document.getElementById('np_department'),
      input_date_payed = document.getElementById('date_payed'),
      input_date_sent = document.getElementById('date_sent'),
      btn_save = document.getElementById('btn_save'),
      order_ok_alert = document.getElementById('order_ok_alert');

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

input_date_payed.addEventListener('click', inputTypeChanger);
input_date_payed.addEventListener('focusout', inputTypeChanger);
input_date_sent.addEventListener('click', inputTypeChanger);
input_date_sent.addEventListener('focusout', inputTypeChanger);
btn_save.addEventListener('click', (e) => {
    e.preventDefault();
    patchData(api_pathname, generatePatchData(form))
    .then(res => {
        if (res.status == 200) okAlert(order_ok_alert); else okAlert(order_ok_alert, false);
    });
    e.currentTarget.blur();
});


async function getData (url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}

async function patchData (url = '', data = {}) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        },
        body: data
    });

    const status = res.status,
          json = await res.json();

    return {
        'status': status,
        'json': json
    };
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

function generatePatchData (form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach(function(value, key) {
        if (value == '') value = null;
        data[key] = value;
    });
    data['date_payed'] ? data['is_payed'] = true : data['is_payed'] = false;
    data['date_sent'] ? data['is_sent'] = true : data['is_sent'] = false;
    const json = JSON.stringify(data);
    return json;
}

function inputTypeChanger (e) {
    if (e.type == 'click') {
        e.target.type = 'date';
    } else if (e.type == 'focusout') {
        if (e.target.value == '') {
            e.target.type = 'text';
        }
    }
}

function okAlert (element, success = true) {
    const style = success ? 'badge-success' : 'badge-danger',
          text = success ? 'Сохранено' : 'Ошибка';
    
    element.classList.remove('badge-success');
    element.classList.remove('badge-danger');
    element.classList.add(style);
    element.textContent = text;
    element.classList.remove('collapse');

    fade(element, 2000);
}

function fade (element, time) {
    setTimeout( () => {
        element.classList.add('collapse');
    }, time);
}


// const btn_sent = document.getElementById('btn_sent');

// btn_sent.addEventListener('click', (e) => {
//     e.preventDefault();
//     postData('http://127.0.0.1:8000/api/orders/1/', { is_sent: true })
//     .then((data) => {
//       console.log(data); // JSON data parsed by `response.json()` call
//     });
// });

// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
// }

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}