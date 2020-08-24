'use strict';


// client input dropdown hint

const   client_input = document.getElementById('instagram'),
        client_dropdown = document.getElementById('client_dropdown'),
        client_phone = document.getElementById('phone'),
        client_name = document.getElementById('name'),
        client_city = document.getElementById('city'),
        client_np_department = document.getElementById('np_department');


client_input.addEventListener('input', clientDropdownShow);
client_input.addEventListener('blur', () => {
    setTimeout(clientDropdownHide, 300);
});


function clientDropdownHide () {
    client_dropdown.classList.remove('show');
}


function clientDropdownShow () {
    getData(clients_api_pathname + '?instagram=' + this.value)
    .then(data => {
        rebuildPopover(data);
    });
}


function rebuildPopover (data) {
    if (data.count != 0) {
        client_dropdown.innerHTML = "";
        client_dropdown.classList.add('show');
        data.results.forEach(client => {
            const row = document.createElement('a');
            row.classList.add('dropdown-item');
            row.textContent = client.instagram;
            client_dropdown.append(row);
            row.addEventListener('click', (e) => {
                e.preventDefault();
                client_input.value = client.instagram;
                client_phone.value = client.phone;
                client_name.value = client.name;
                client_city.value = client.city;
                client_np_department.value = client.np_department;
                client_dropdown.classList.remove('show');
            });
        });
    } else {
        client_dropdown.classList.remove('show');
    }

}
