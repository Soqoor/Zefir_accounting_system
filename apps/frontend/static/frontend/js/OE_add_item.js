'use strict';

const products_url = '/api/products/?name__icontains=',
      product_input = document.getElementById('product'),
      product_dropdown = document.getElementById('product_dropdown'),
      product_price = document.getElementById('price');


product_input.addEventListener('input', productPopoverEvent);
product_input.addEventListener('blur', () => {
    setTimeout(hideItemDropdown, 300);
});

function hideItemDropdown () {
    product_dropdown.classList.remove('show');
}

function productPopoverEvent () {
    if (this.value) {
        getData(products_url + this.value)
        .then(data => {
            productRebuildPopover(data);
        });
    }
}

async function getData (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error (`Could not fetch ${url}, status ${res.status}`);
    return await res.json();
}

function productRebuildPopover (data) {
    if (data.count != 0) {
        product_dropdown.innerHTML = "";
        product_dropdown.classList.add('show');
        data.results.forEach(product => {
            const row = document.createElement('a');
            row.classList.add('dropdown-item');
            row.textContent = product.name;
            product_dropdown.append(row);
            row.addEventListener('click', (e) => {
                e.preventDefault();
                product_input.value = product.name;
                product_input.id = product.id;
                product_price.value = product.price_default;
                product_dropdown.classList.remove('show');
            });
        });
    } else {
        product_dropdown.classList.remove('show');
    }

}
