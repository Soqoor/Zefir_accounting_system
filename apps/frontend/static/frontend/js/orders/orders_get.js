'use strict';
      

// reload and rebuild orders list on page load

const   orders_pagination_bar = document.getElementById('pagination_bar'),
        orders_pagination_bar_li_prev = document.getElementById('li_prev'),
        orders_pagination_bar_li_next = document.getElementById('li_next'),
        orders_pagination_bar_btn_prev = document.getElementById('btn_prev'),
        orders_pagination_bar_btn_next = document.getElementById('btn_next'),
        orders_pagination_bar_text_field = document.getElementById('pagination_text_field');


getData(order_api_pathname + window.location.search)
    .then(data => {
        rebuildOrders(data);
    });


function rebuildOrders (data) {

    document.querySelector('.table_body').innerHTML = '';

    if (data.results.length == 0) {

        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td colspan="7">В этом месте сейчас пусто</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    data.results.forEach (({id, instagram, name, city, date_planed, date_deadline, is_payed, is_sent, orderitems}) => {
        const row = document.createElement('tr');

        let tooltip = '';
        let items_ready = 0;
        let items = '';
        orderitems.forEach (({product_text, amount, is_ready}) => {
            if (is_ready || is_sent) {
                tooltip += `<div class="text-success">${product_text} ${amount}шт.</div>`;
                items_ready += 1;
            } else {
                tooltip += `<div>${product_text} ${amount}шт.</div>`;
            }
        });

        if (is_sent) items = 'отправлено'; else items = `${items_ready}/${orderitems.length}`;


        if (is_sent) {
            row.classList.add("table-success");
        } else if (date_planed < new Date().toISOString() && !is_sent) {
            row.classList.add("table-danger");
        }

        row.classList.add("unselectable");
        row.innerHTML = `
            <tr>
                <td>${instagram}</td>
                <td>${name}</td>
                <td>${city}</td>
                <td>${date_planed}</td>
                <td>${date_deadline}</td>
                ${is_payed ? '<td class="text-success">Да</td>' : '<td class="text-danger">Нет</td>'}
                <td data-toggle="tooltip" data-placement="right" title='${tooltip}'>${items}</td>
            </tr>
        `;
        row.addEventListener('click', () => {
            window.open(`${id}/`, '_parent');
        });
        document.querySelector('.table_body').append(row);

        $(function(){
            // инициализации подсказок для всех элементов на странице, имеющих атрибут data-toggle="tooltip"
            $('[data-toggle="tooltip"]').tooltip({html: true});    
        });

    });

    orders_pagination_bar.classList.remove('collapse');
    orders_pagination_bar_li_next.classList.remove('disabled');
    orders_pagination_bar_li_prev.classList.remove('disabled');

    if (!data.next && !data.previous) {
        orders_pagination_bar.classList.add('collapse');
    } else {

        orders_pagination_bar_text_field.textContent = `${data.page} из ${data.pages}`;
    
        if (data.next) {
            orders_pagination_bar_btn_next.href = window.location.pathname + '?' + data.next.split('?')[1];
        } else {
            orders_pagination_bar_li_next.classList.add('disabled');
        }
    
        if (data.previous) {
            orders_pagination_bar_btn_prev.href = window.location.pathname + '?' + (data.previous.split('?')[1] || '');
        } else {
            orders_pagination_bar_li_prev.classList.add('disabled');
        }

    }
    
}