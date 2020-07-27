'use strict';


const input_date_created = document.getElementById('date_created'),
      input_date_planed = document.getElementById('date_planed'),
      input_date_deadline = document.getElementById('date_deadline'),
      input_instagram = document.getElementById('instagram'),
      input_phone = document.getElementById('phone'),
      input_city = document.getElementById('city'),
      input_np_department = document.getElementById('np_department'),
      input_date_payed = document.getElementById('date_payed'),
      input_date_sent = document.getElementById('date_sent');


// fill page on load
reloadOrder(`/api${window.location.pathname}`)
.then(data => {
    rebuildOrder(data);
});

async function reloadOrder (url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}

function rebuildOrder (data) {
    console.log(data.instagram);
    input_date_created.value = data.date_created;
    input_date_planed.value = data.date_planed;
    input_date_deadline.value = data.date_deadline;
    input_instagram.value = data.instagram;
    input_phone.value = data.phone;
    input_city.value = data.city;
    input_np_department.value = data.np_department;
    input_date_payed.value = data.date_payed;
    input_date_sent.value = data.date_sent;
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
