'use strict';


$('[data-toggle="tooltip"]').tooltip({html: true});


//advanced user settings
const novice_user = document.getElementById('novice_user');
let advanced_user = localStorage.getItem('advanced_user');

if (advanced_user == 'true') {
    novice_user.checked = false;
}

novice_user.addEventListener('change', (e) => {
    localStorage.setItem('advanced_user', !novice_user.checked);
});


const btn_new_order = document.getElementById('btn_new_order');
btn_new_order.addEventListener('click', () => {
    window.open('/orders/0/', '_parent');
});
