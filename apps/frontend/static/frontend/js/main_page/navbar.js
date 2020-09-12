'use strict';


$('[data-toggle="tooltip"]').tooltip({html: true});

const btn_logout = document.getElementById('btn_logout');

btn_logout.addEventListener('click', e => {
    getData(logout_pathname)
    .then(data => {
        window.open(data.url, '_parent');
    });
});
