'use strict';

// activate orders search
const   search_input = document.getElementById('search_input'),
        search_btn = document.getElementById('search_btn');

search_btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(`/orders/search/?query=${search_input.value}`, '_parent');
});

//activate detail orders search
const   collapse_btn = document.getElementById('collapse_btn'),
        adv_search_btn = document.getElementById('adv_search_btn'),
        adv_search_reset_btn = document.getElementById('adv_search_reset_btn'),
        form_inputs = document.querySelectorAll('.adv_search');

collapse_btn.addEventListener('click', (e) => e.target.blur());

adv_search_btn.addEventListener('click', e => {
    e.preventDefault();
    let url = '/orders/?';
    form_inputs.forEach(input => {
        if (input.value && (input.type != 'radio' || input.checked)) {
            url += `${input.name}=${input.value}&`;
        }
    });
    window.open(url.slice(0, -1), '_parent');
});

//fill adv_search form with data from get paremeters
if (window.location.pathname == '/orders/') {
    const urlParams = new URLSearchParams(window.location.search);
    form_inputs.forEach(input => {
        if (urlParams.has(input.name)) {
            if (input.type == 'radio') {
                if (input.value == urlParams.get(input.name)) {
                    input.checked = true;
                }
            } else {
                input.value = urlParams.get(input.name);
            }
        }
    });
}

// reset form on btn click
adv_search_reset_btn.addEventListener('click', e => {
    e.preventDefault();
    e.target.blur();
    form_inputs.forEach(input => {
        if (input.type == 'radio') {
            input.checked = false;
        } else {
            input.type = 'text';
            input.value = '';
        }
    });
});
