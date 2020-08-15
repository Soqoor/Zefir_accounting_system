'use strict';

const csrftoken = getCookie('csrftoken'),
      form = document.getElementById('order_form'),
      btn_save = document.getElementById('btn_save'),
      order_ok_alert = document.getElementById('order_ok_alert'),
      save_api_pathname = `/api${window.location.pathname}`;


btn_save.addEventListener('click', (e) => {
    e.preventDefault();
    patchData(save_api_pathname, generatePatchData(form))
    .then(res => {
        if (res.status == 200) okAlert(order_ok_alert); else okAlert(order_ok_alert, false);
    });
    e.currentTarget.blur();
});


async function patchData (url = '', data = {}) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        },
        body: data
    });

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    const status = res.status,
          json = await res.json();

    return {
        'status': status,
        'json': json
    };
}


function generatePatchData (form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach(function(value, key) {
        if (value == '') value = null;
        if (key == 'phone') value = value.replace(/\D/g, ""); // dismiss phone mask
        data[key] = value;
    });
    data['date_payed'] ? data['is_payed'] = true : data['is_payed'] = false;
    data['date_sent'] ? data['is_sent'] = true : data['is_sent'] = false;

    
    const json = JSON.stringify(data);
    return json;
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