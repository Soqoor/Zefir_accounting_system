'use strict';

const minus = document.getElementById('minus'),
      btn_add_item = document.getElementById('btn_add_item');


// set event listners on items rows after page load
document.addEventListener('items_loaded', changeClickMethod); // event fired when OI loading finished

// swap event listeners on delete button click
minus.addEventListener('click', changeClickMethod);


function changeClickMethod () {

    if (this != document) {
        this.classList.toggle('active');
        this.blur();
    }

    const rows = document.querySelectorAll('.table_row');

    if (this != document && this.classList.contains('active')) {
        rows.forEach(row => {
            row.removeEventListener('click', itemIsReadyListener);
            row.addEventListener('click', itemDeleteListener);
            row.addEventListener('mouseenter', lineRedHighlight);
            row.addEventListener('mouseleave', lineRedHighlight);
        });
    } else {
        rows.forEach(row => {
            row.removeEventListener('click', itemDeleteListener);
            row.addEventListener('click', itemIsReadyListener);
            row.removeEventListener('mouseenter', lineRedHighlight);
            row.removeEventListener('mouseleave', lineRedHighlight);
        });
    }
}


function lineRedHighlight () {
    this.classList.toggle('table-danger');
}


function itemDeleteListener () {
    if (confirm('Вы действительно хотите удалить товар из заказа?')) {
        postData(item_api_pathname + this.id, 'DELETE')
        .then(res => {
            if (res.status == 204) this.remove(); else console.log(res);
        });
    }
}


function itemIsReadyListener () {
    let data = {};
    if (this.classList.contains('table-success')) {
        data = {'is_ready': false};
    } else {
        data = {'is_ready': true};
    }
    data = JSON.stringify(data);
    postData(item_api_pathname + this.id + '/', 'PATCH', data)
    .then(res => {
        if (res.status == 200) this.classList.toggle('table-success'); else console.log(res);
    });
}

