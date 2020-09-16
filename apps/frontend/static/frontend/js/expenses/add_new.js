'use strict';

const   btn_new_expense = document.getElementById('link_new_expense'),
        btn_new_category = document.getElementById('link_new_category'),
        date_input = document.getElementById('date_input'),
        category_selector = document.getElementById('category_selector'),
        name_input = document.getElementById('name_input'),
        value_input = document.getElementById('value_input'),
        btn_add_expense_save = document.getElementById('btn_add_expense_save'),
        btn_add_expense_error = document.getElementById('btn_add_expense_error'),
        category_input = document.getElementById('category_input'),
        btn_add_category_error = document.getElementById('btn_add_category_error'),
        btn_add_category_save = document.getElementById('btn_add_category_save');

btn_new_expense.addEventListener('focus', () => btn_new_expense.blur());

// product modal window preparation:

btn_new_expense.addEventListener('click', resetExpenseModal);

function categoryPrepare () {
    getData(expenses_cat_api_pathname)
        .then(data => {
            category_selector.innerHTML = '<option value="" selected disabled hidden>Выберите категорию</option>';

            data.forEach(element => {
                const option = document.createElement('option');
                option.id = element.id;
                option.textContent = element.name;
                category_selector.append(option);
            });

        });
}

function resetExpenseModal () {
    categoryPrepare();
    name_input.value = '';
    value_input.value = '';
    date_input.value = new Date().toISOString().substr(0, 10);
}

// send button event

btn_add_expense_save.addEventListener('click', postExpense);

function postExpense() {
    postData(expenses_api_pathname, 'POST', generatePostExpenseData())
    .then(res => {
        if (res.status == 201) {
            location.reload();
        } 
        else {
            alertSwapper(btn_add_expense_error);
        }
    });
}

function generatePostExpenseData () {
    let data = {
        "date": date_input.value,
        "name": name_input.value,
        "value": value_input.value,
        "category": $(category_selector).children(":selected").attr("id")
    };

    const json = JSON.stringify(data);
    return json;
}

function alertSwapper(button) {
    btn_add_expense_save.blur();
    button.classList.remove('collapse');
    setTimeout(() => button.classList.add('collapse'), 3000);
}

// catalog modal window preparation:

btn_new_category.addEventListener('click', () => category_input.value = '');

// send button event

btn_add_category_save.addEventListener('click', postCategory);

function postCategory() {
    postData(expenses_cat_api_pathname, 'POST', generatePostCategoryData())
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
    let data = {"name": category_input.value};
    const json = JSON.stringify(data);
    return json;
}