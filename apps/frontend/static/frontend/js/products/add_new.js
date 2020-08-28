'use strict';

const   btn_new_product = document.getElementById('link_new_product'),
        btn_new_category = document.getElementById('link_new_category'),
        catalog_selector = document.getElementById('catalog_selector'),
        name_input = document.getElementById('name_input'),
        price_default_input = document.getElementById('price_default_input'),
        btn_add_product_save = document.getElementById('btn_add_product_save'),
        btn_add_product_error = document.getElementById('btn_add_product_error'),
        category_input = document.getElementById('category_input'),
        btn_add_category_error = document.getElementById('btn_add_category_error'),
        btn_add_category_save = document.getElementById('btn_add_category_save');

btn_new_product.addEventListener('focus', () => btn_new_product.blur());

// product modal window preparation:

btn_new_product.addEventListener('click', resetProductModal);

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

function resetProductModal () {
    catalogPrepare();
    name_input.value = '';
    price_default_input.value = '';
}

// send button event

btn_add_product_save.addEventListener('click', postProduct);

function postProduct() {
    postData(product_api_pathname, 'POST', generatePostProductData())
    .then(res => {
        if (res.status == 201) {
            location.reload();
        } 
        else {
            alertSwapper(btn_add_product_error);
        }
    });
}

function generatePostProductData () {
    let data = {
        "name": name_input.value,
        "price_default": price_default_input.value,
        "catalog": $(catalog_selector).children(":selected").attr("id")
    };

    const json = JSON.stringify(data);
    return json;
}

function alertSwapper(button) {
    btn_add_product_save.blur();
    button.classList.remove('collapse');
    setTimeout(() => button.classList.add('collapse'), 3000);
}

// catalog modal window preparation:

btn_new_category.addEventListener('click', () => category_input.value = '');

// send button event

btn_add_category_save.addEventListener('click', postCategory);

function postCategory() {
    postData(catalog_api_pathname, 'POST', generatePostCategoryData())
    .then(res => {
        if (res.status == 201) {
            location.reload();
        } 
        else {
            alertSwapper(btn_add_category_error);
        }
    });
}

function generatePostCategoryData () {
    let data = {"category": category_input.value};
    const json = JSON.stringify(data);
    return json;
}