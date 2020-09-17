'use strict';

// add event listeners, that saves changes in products
// script starts when products_get.js finished

document.addEventListener('products_loaded', () => {

    const rows = document.querySelectorAll('.product_row');

    rows.forEach(row => {
        
        const   catalog_selector = row.querySelector('.catalog_selector'),
                name_input = row.querySelector('.name_input'),
                price_input = row.querySelector('.price_input');
        
        catalog_selector.addEventListener('change', patchChanges);
        name_input.addEventListener('change', patchChanges);
        price_input.addEventListener('change', patchChanges);

    });
});

function patchChanges() {

    if (localStorage.getItem('advanced_user') != 'true') {
        if (!confirm('Внести изменения в товар?')) {
            location.reload();
            return;
        }
    }

    let data = {};
    data[this.dataset.field_name] = this.value;
    const json = JSON.stringify(data);
    this.blur();
    postData(product_api_pathname + this.dataset.product_id +'/', 'PATCH', json)
    .then(res => {
        successAlert(this);
    });
}

function successAlert(element) {
    element.classList.add('bg-success');
    setTimeout(() => {
        element.classList.remove('bg-success');
    }, 500);
}