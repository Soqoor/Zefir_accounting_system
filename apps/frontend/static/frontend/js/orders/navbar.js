'use strict';
      

// reload and rebuild orders list on page load

const   search_input = document.getElementById('search_input'),
        search_btn = document.getElementById('search_btn');


search_btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(`/orders/search/?query=${search_input.value}`, '_parent');
});
