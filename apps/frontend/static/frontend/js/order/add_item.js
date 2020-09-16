'use strict';

const   plus_button = document.getElementById('plus'),
        catalog_selector = document.getElementById('catalog_selector'),
        product_selector = document.getElementById('product_selector'),
        div_product_select = document.getElementById('div_product_select'),
        div_product_input = document.getElementById('div_product_input'),
        product_input = document.getElementById('product_input'),
        product_input_dropdown = document.getElementById('product_dropdown'),
        product_description = document.getElementById('product_description'),
        product_amount = document.getElementById('product_amount'),
        product_price = document.getElementById('product_price'),
        add_oi_save_button = document.getElementById('btn_add_item_save'),
        btn_add_item_error = document.getElementById('btn_add_item_error'),
        btn_add_item_repeat_error = document.getElementById('btn_add_item_repeat_error');


plus_button.addEventListener('focus', () => plus_button.blur());

// modal window preparation:

plus_button.addEventListener('click', resetModal);

function catalogPrepare () {
    getData(catalog_api_pathname)
        .then(data => {
            catalog_selector.innerHTML = '<option value="" selected disabled hidden>Выберите категорию</option>';

            data.forEach(element => {
                const option = document.createElement('option');
                option.id = element.id;
                option.textContent = element.category;
                catalog_selector.append(option);
            });

        });
}

function resetModal () {
    catalogPrepare();
    product_selector.innerHTML = '<option value="" selected disabled hidden>Выберите продукт</option>';
    div_product_select.classList.add('collapse');
    div_product_input.classList.remove('collapse');
    product_input.value = '';
    product_description.value = '';
    product_amount.value = '';
    product_price.value = '';
    product_description.disabled = true;
    product_amount.disabled = true;
    product_price.disabled = true;
}


// product selection using selection fields:

catalog_selector.addEventListener('change', catalogSelected);
product_selector.addEventListener('change', productSelected);

function catalogSelected () {

    div_product_select.classList.remove('collapse');
    div_product_input.classList.add('collapse');

    getData(product_api_pathname + '?catalog=' + $(this).children(":selected").attr("id"))
        .then(data => {
            product_selector.innerHTML = '<option value="" selected disabled hidden>Выберите продукт</option>';

            data.results.forEach(product => {
                const option = document.createElement('option');
                option.dataset.id = product.id;
                option.textContent = product.name;
                option.dataset.price_default = product.price_default;
                product_selector.append(option);
            });
        });
}

function productSelected () {
    if (this) {
        product_price.value = $(this).children(":selected").attr("data-price_default");
        product_input.dataset.id = $(this).children(":selected").attr("data-id");
    }
    product_description.disabled = false;
    product_amount.disabled = false;
    product_price.disabled = false;
}


// product selection using dropdown in text field:

product_input.addEventListener('input', productDropdownShow);
product_input.addEventListener('blur', () => setTimeout(productDropdownHide, 300));

function productDropdownShow () {
    if (this.value) {
        getData(product_api_pathname + '?name__icontains=' +this.value)
        .then(data => {
            productRebuildDropdown(data);
        });
    }
}

function productRebuildDropdown (data) {
    if (data.count != 0) {
        product_input_dropdown.innerHTML = "";
        product_input_dropdown.classList.add('show');
        data.results.forEach(product => {
            const row = document.createElement('a');
            row.classList.add('dropdown-item');
            row.textContent = product.name;
            product_input_dropdown.append(row);
            row.addEventListener('click', (e) => {
                e.preventDefault();
                product_input.value = product.name;
                product_input.dataset.id = product.id;
                product_price.value = product.price_default;
                product_input_dropdown.classList.remove('show');
                productSelected();
            });
        });
    } else {
        product_input_dropdown.classList.remove('show');
    }

}

function productDropdownHide () {
    product_input_dropdown.classList.remove('show');
}


// send button event

add_oi_save_button.addEventListener('click', postItem);

function postItem() {
    postData(items_api_pathname, 'POST', generatePostItemData())
    .then(res => {
        if (res.status == 201) {
            location.reload();
        } 
        else {
            if (res.json.non_field_errors && res.json.non_field_errors.includes('Поля order, product должны производить массив с уникальными значениями.')) {
                alertSwapper(btn_add_item_repeat_error);
            }
            else {
                alertSwapper(btn_add_item_error);
            }
        }
    });
}

function generatePostItemData () {
    let data = {
        "product": product_input.dataset.id,
        "order": +current_pathname.replace(/\D+/g,""),
        "description": product_description.value,
        "amount": product_amount.value,
        "price": product_price.value,
        "is_ready": false
    };

    const json = JSON.stringify(data);
    return json;
}


function alertSwapper(button) {
    add_oi_save_button.blur();
    button.classList.remove('collapse');
    setTimeout(() => button.classList.add('collapse'), 2000);
}