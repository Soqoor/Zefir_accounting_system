'use strict';
      

// reload and rebuild products list on page load

getData(expenses_api_pathname + window.location.search)
    .then(expenses => {
        getData(expenses_cat_api_pathname)
        .then(categories => {
            rebuildExpenses(expenses, categories);
        });
    });


function rebuildExpenses (expenses, categories) {

    document.querySelector('.table_body').innerHTML = '';

    if (expenses.results.length == 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td colspan="3">В этом месте сейчас пусто</td>
            </tr>
        `;
        document.querySelector('.table_body').append(row);
    }

    expenses.results.forEach (expense => {
        const row = document.createElement('tr');
        const date_td = document.createElement('td');
        const category_td = document.createElement('td');
        const name_td = document.createElement('td');
        const value_td = document.createElement('td');
        const date_input = document.createElement('input');
        const category_selector = document.createElement('select');
        const name_input = document.createElement('input');
        const value_input = document.createElement('input');

        row.dataset.id = expense.id;
        row.classList.add('expense_row'); // for selectors in other scripts

        category_selector.dataset.expense_id = expense.id; //neded for post requests
        category_selector.dataset.field_name = 'category'; //neded for post requests
        category_selector.classList.add('form-control', 'form-control-sm', 'border-0', 'catalog_selector');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            if (category.id == expense.category) option.selected = true;
            category_selector.append(option);
        });

        date_input.dataset.expense_id = expense.id; //neded for post requests
        date_input.dataset.field_name = 'date'; //neded for post requests
        date_input.classList.add('form-control', 'form-control-sm', 'border-0', 'date_input');
        date_input.autocomplete = 'off';
        date_input.value = expense.date;

        name_input.dataset.expense_id = expense.id; //neded for post requests
        name_input.dataset.field_name = 'name'; //neded for post requests
        name_input.classList.add('form-control', 'form-control-sm', 'border-0', 'name_input');
        name_input.autocomplete = 'off';
        name_input.value = expense.name;

        value_input.dataset.expense_id = expense.id; //neded for post requests
        value_input.dataset.field_name = 'value'; //neded for post requests
        value_input.classList.add('form-control', 'form-control-sm', 'border-0', 'value_input');
        value_input.autocomplete = 'off';
        value_input.value = expense.value;

        date_td.append(date_input);
        category_td.append(category_selector);
        name_td.append(name_input);
        value_td.append(value_input);
        row.append(date_td);
        row.append(category_td);
        row.append(name_td);
        row.append(value_td);
        document.querySelector('.table_body').append(row);
    });

    rebuildPaginationBar(expenses);

    let event = new Event("expenses_loaded");
    document.dispatchEvent(event); // trigger for start generating event listeners
}