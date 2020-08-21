'use strict';

const clients_url = '/api/clients/?instagram=',
      client_input = document.getElementById('instagram'),
      client_dropdown = document.getElementById('client_dropdown'),
      client_phone = document.getElementById('phone'),
      client_name = document.getElementById('name'),
      client_city = document.getElementById('city'),
      client_np_department = document.getElementById('np_department');


client_input.addEventListener('input', popoverEvent);
client_input.addEventListener('blur', () => {
    setTimeout(hideClientDropdown, 300);
});

function hideClientDropdown () {
    client_dropdown.classList.remove('show');
}

function popoverEvent () {
    console.log(clients_url + this.value);
    getData(clients_url + this.value)
    .then(data => {
        rebuildPopover(data);
    });
}

async function getData (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error (`Could not fetch ${url}, status ${res.status}`);
    return await res.json();
}


function rebuildPopover (data) {
    console.log(data);
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
