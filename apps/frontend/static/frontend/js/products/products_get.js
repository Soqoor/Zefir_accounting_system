'use strict';
      

// reload and rebuild products list on page load

getData(product_api_pathname + window.location.search)
    .then(products => {
        getData(catalog_api_pathname)
        .then(categories => {
            rebuildProducts(products, categories);
        });
    });


function rebuildProducts (products, categories) {

    document.querySelector('.table_body').innerHTML = '';

    if (products.results.length == 0) {

        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td colspan="3">В этом месте сейчас пусто</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    products.results.forEach (product => {
        const row = document.createElement('tr');
        const catalog_td = document.createElement('td');
        const name_td = document.createElement('td');
        const price_td = document.createElement('td');
        const catalog_selector = document.createElement('select');
        const name_input = document.createElement('input');
        const price_input = document.createElement('input');

        row.dataset.id = product.id;
        row.classList.add('product_row'); // for selectors in other scripts

        catalog_selector.dataset.product_id = product.id; //neded for post requests
        catalog_selector.dataset.field_name = 'catalog'; //neded for post requests
        catalog_selector.classList.add('form-control', 'form-control-sm', 'border-0', 'catalog_selector');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.category;
            if (category.id == product.catalog) option.selected = true;
            catalog_selector.append(option);
        });

        name_input.dataset.product_id = product.id; //neded for post requests
        name_input.dataset.field_name = 'name'; //neded for post requests
        name_input.classList.add('form-control', 'form-control-sm', 'border-0', 'name_input');
        name_input.autocomplete = 'off';
        name_input.value = product.name;

        price_input.dataset.product_id = product.id; //neded for post requests
        price_input.dataset.field_name = 'price_default'; //neded for post requests
        price_input.classList.add('form-control', 'form-control-sm', 'border-0', 'price_input');
        price_input.autocomplete = 'off';
        price_input.value = product.price_default;

        catalog_td.append(catalog_selector);
        name_td.append(name_input);
        price_td.append(price_input);
        row.append(catalog_td);
        row.append(name_td);
        row.append(price_td);
        document.querySelector('.table_body').append(row);
    });

    rebuildPaginationBar(products);

    let event = new Event("products_loaded");
    document.dispatchEvent(event); // trigger for start generating event listeners
}