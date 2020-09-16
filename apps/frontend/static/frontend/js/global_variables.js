'use strict';

const   csrftoken = getCookie('csrftoken'),
        login_pathname = '/api/login/',
        logout_pathname = '/api/logout/',
        current_pathname = window.location.pathname,
        current_api_pathname = `/api${current_pathname}`,
        order_api_pathname = '/api/orders/',
        search_api_pathname = '/api/orders/search/',
        items_api_pathname = `/api/items/`,
        product_api_pathname = '/api/products/',
        catalog_api_pathname = '/api/catalog/',
        clients_api_pathname = '/api/clients/',
        expenses_api_pathname = '/api/expenses/',
        expenses_cat_api_pathname = '/api/expenses_cat/',
        count_api_pathname = '/api/count/',
        calendar_api_pathname = '/api/calendar/',
        charts_api_pathname = '/api/charts/';


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

async function getData (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error (`Could not fetch ${url}, status ${res.status}`);
    return await res.json();
}

async function postData (url, method, data = {}) {
    const res = await fetch(url, {
        method: method,
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        },
        body: data
    });

    const status = res.status;
    let json = '';
    if (status != 204) {
        json = await res.json();
    }

    return {
        'status': status,
        'json': json
    };
}

const   pagination_bar = document.getElementById('pagination_bar'),
        pagination_bar_li_prev = document.getElementById('li_prev'),
        pagination_bar_li_next = document.getElementById('li_next'),
        pagination_bar_btn_prev = document.getElementById('btn_prev'),
        pagination_bar_btn_next = document.getElementById('btn_next'),
        pagination_bar_text_field = document.getElementById('pagination_text_field');

function rebuildPaginationBar(data) {
    pagination_bar.classList.remove('collapse');
    pagination_bar_li_next.classList.remove('disabled');
    pagination_bar_li_prev.classList.remove('disabled');

    if (!data.next && !data.previous) {
        pagination_bar.classList.add('collapse');
    } else {
        pagination_bar_text_field.textContent = `Страница ${data.page} из ${data.pages}`;
        if (data.next) {
            pagination_bar_btn_next.href = window.location.pathname + '?' + data.next.split('?')[1];
        } else {
            pagination_bar_li_next.classList.add('disabled');
        }
        if (data.previous) {
            pagination_bar_btn_prev.href = window.location.pathname + '?' + (data.previous.split('?')[1] || '');
        } else {
            pagination_bar_li_prev.classList.add('disabled');
        }
    }
}