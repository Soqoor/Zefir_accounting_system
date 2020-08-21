'use strict';

const btn_orders = document.getElementById("btn_orders"),
      last_used_url = sessionStorage.getItem('last_used_url');

btn_orders.href = last_used_url || btn_orders.href;
