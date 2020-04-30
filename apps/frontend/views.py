from django.shortcuts import render
import requests


def get_api_url(url):
    if url.find('?') == -1:
        return url + 'api/'
    else:
        a = url.split('?')
        a.insert(1, 'api/?')
        return ''.join(a)


def orders_request(request):
    json = requests.get(get_api_url(request.build_absolute_uri())).json()
    return render(request, 'frontend/orders_list.html', {'json': json})
