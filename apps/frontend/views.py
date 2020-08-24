from django.shortcuts import render
import requests


def main_page(request):
    return render(request, 'frontend/main_page.html')


def orders_request(request):
    return render(request, 'frontend/orders.html')


def order_edit(request, pk):
    return render(request, 'frontend/order.html', {'pk': pk})
