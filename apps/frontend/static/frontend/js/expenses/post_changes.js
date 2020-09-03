'use strict';

// add event listeners, that saves changes in products
// script starts when products_get.js finished

document.addEventListener('expenses_loaded', () => {

    const rows = document.querySelectorAll('.expense_row');

    rows.forEach(row => {
        
        const   catalog_selector = row.querySelector('.catalog_selector'),
                date_input = row.querySelector('.date_input'),
                name_input = row.querySelector('.name_input'),
                value_input = row.querySelector('.value_input');
        
        catalog_selector.addEventListener('change', patchChanges);
        date_input.addEventListener('change', patchChanges);
        name_input.addEventListener('change', patchChanges);
        value_input.addEventListener('change', patchChanges);

    });
});

function patchChanges() {
    let data = {};
    data[this.dataset.field_name] = this.value;
    const json = JSON.stringify(data);
    console.log(json);
    this.blur();
    postData(expenses_api_pathname + this.dataset.expense_id +'/', 'PATCH', json)
    .then(res => {
        console.log(res);
        successAlert(this);
    });
}

function successAlert(element) {
    element.classList.add('bg-success');
    setTimeout(() => {
        element.classList.remove('bg-success');
    }, 500);
}