from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
import requests


def login(request):
    return render(request, 'frontend/login.html')

def main_page(request):
    return render(request, 'frontend/main_page.html')

def orders_request(request):
    return render(request, 'frontend/orders.html')

def order_edit(request, pk):
    return render(request, 'frontend/order.html', {'pk': pk})

def products_request(request):
    return render(request, 'frontend/products.html')

def expenses_request(request):
    return render(request, 'frontend/expenses.html')

def charts_request(request):
    return render(request, 'frontend/charts.html')