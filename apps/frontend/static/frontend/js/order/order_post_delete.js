'use strict';


// create or modify order

const   order_form = document.getElementById('order_form'),
        order_save_btn = document.getElementById('btn_save'),
        order_ok_alert = document.getElementById('order_ok_alert'),
        order_delete_button = document.getElementById('order_delete_button'),
        order_pk = +current_pathname.replace(/\D+/g,"");


order_save_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (order_pk == 0) {
        postData(order_api_pathname, 'POST', generateOrderData(order_form))
        .then(res => {
            console.log(res);
            if (res.status == 201) window.open(current_pathname.replace('0', res.json.id), '_parent'); else orderOkAlert(order_ok_alert, false);
        });
    } else {
        postData(current_api_pathname, 'PATCH', generateOrderData(order_form))
        .then(res => {
            if (res.status == 200) orderOkAlert(order_ok_alert); else orderOkAlert(order_ok_alert, false);
        });
    }
    e.currentTarget.blur();
});


order_delete_button.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Вы действительно хотите удалить этот заказ?')) {
        postData(current_api_pathname, 'DELETE')
        .then(res => {
            if (res.status == 200) console.log(res); else console.log(res);
        });
    }
    e.currentTarget.blur();
});


function generateOrderData (form) {
    const formData = new FormData(form);
    let data = {};
    formData.forEach(function(value, key) {
        if (key == 'id' && +current_pathname.replace(/\D+/g,"") == 0) return; //skip id if new order
        if (value == '') value = null;
        if (key == 'phone' && value) value = value.replace(/\D/g, ""); // dismiss phone mask
        data[key] = value;
    });
    data.date_payed ? data.is_payed = true : data.is_payed = false;
    data.date_sent ? data.is_sent = true : data.is_sent = false;
    if (!data.city) delete data.city; // "null" is forbidden. django creates empty value if key absent
    if (!data.name) delete data.name;

    
    const json = JSON.stringify(data);
    return json;
}


function orderOkAlert (element, success = true) {
    const style = success ? 'badge-success' : 'badge-danger',
          text = success ? 'Сохранено' : 'Ошибка';
    
    element.classList.remove('badge-success');
    element.classList.remove('badge-danger');
    element.classList.add(style);
    element.textContent = text;
    element.classList.remove('collapse');

    setTimeout( () => element.classList.add('collapse'), 2000);
}