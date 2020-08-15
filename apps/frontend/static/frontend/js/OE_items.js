'use strict';

const minus = document.getElementById('minus'),
      item_api_pathname = `/api/items/`;


minus.addEventListener('click', changeClickMethod);
document.addEventListener('items_loaded', changeClickMethod);

function changeClickMethod () {

    if (this != document) {
        this.classList.toggle('active');
        this.blur();
    }

    const rows = document.querySelectorAll('.table_row');

    if (this != document && this.classList.contains('active')) {
        rows.forEach(row => {
            row.removeEventListener('click', isReadyListener);
            row.addEventListener('click', deleteListener);
            row.addEventListener('mouseenter', lineHighlight);
            row.addEventListener('mouseleave', lineHighlight);
        });
    } else {
        rows.forEach(row => {
            row.removeEventListener('click', deleteListener);
            row.addEventListener('click', isReadyListener);
            row.removeEventListener('mouseenter', lineHighlight);
            row.removeEventListener('mouseleave', lineHighlight);
        });
    }
}

function lineHighlight () {
    this.classList.toggle('table-danger');
}


function deleteListener () {
    deleteItem(item_api_pathname + this.id)
    .then(res => {
        if (res.status == 204) this.remove(); else console.log(res);
    });
}

function isReadyListener () {
    let data = {};
    if (this.classList.contains('table-success')) {
        data = {'is_ready': false};
    } else {
        data = {'is_ready': true};
    }
    data = JSON.stringify(data);
    isReadyItem(item_api_pathname + this.id + '/', data)
    .then(res => {
        if (res.status == 200) this.classList.toggle('table-success'); else console.log(res);
    });
}

async function deleteItem (url = '') {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
        'X-CSRFToken': csrftoken
        },
    });

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return res;
}

async function isReadyItem (url = '', data = {}) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        },
        body: data,
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