'use strict';

const   inputLogin = document.getElementById('inputLogin'),
        inputPassword = document.getElementById('inputPassword'),
        btn_login = document.getElementById('btn_login');

btn_login.addEventListener('click', e => {
    e.preventDefault();
    e.target.blur();
    let data = {
        'username': inputLogin.value,
        'password': inputPassword.value
    };
    data = JSON.stringify(data);
    postData(login_pathname, 'POST', data)
    .then(data => {
        window.open(data.json.url, '_parent');
    });
});
