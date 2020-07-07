from django.shortcuts import render
import requests


def get_api_url(url):
    if url.find('?') == -1:
        return url + 'api/'
    else:
        a = url.split('?')
        a.insert(1, 'api/?')
        return ''.join(a)


def main_page(request):
    return render(request, 'frontend/main_page.html')


def orders_request(request):
    json = requests.get(get_api_url(request.build_absolute_uri())).json()
    return render(request, 'frontend/orders_list.html', {'json': json})


def order_edit(request, pk):
    order = requests.get(get_api_url(request.build_absolute_uri())).json()
    items = requests.get(request.scheme + '://' + request.get_host() + '/items/api/?order=' + str(pk)).json()
    json = {'order': order, 'items': items}
    return render(request, 'frontend/order_edit.html', {'json': json})
