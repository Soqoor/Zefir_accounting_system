'use strict';

const   csrftoken = getCookie('csrftoken'),
        current_pathname = window.location.pathname,
        current_api_pathname = `/api${current_pathname}`,
        order_api_pathname = '/api/orders/',
        items_api_pathname = `/api/items/`,
        product_api_pathname = '/api/products/',
        catalog_api_pathname = '/api/catalog/',
        clients_api_pathname = '/api/clients/';


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

    const status = res.status,
          json = await res.json();

    return {
        'status': status,
        'json': json
    };
}