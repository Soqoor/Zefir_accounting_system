from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
import requests


def login(request):
    return render(request, 'frontend/login.html')

@login_required
def main_page(request):
    return render(request, 'frontend/main_page.html')

@login_required
def orders_request(request):
    return render(request, 'frontend/orders.html')

@login_required
def order_edit(request, pk):
    return render(request, 'frontend/order.html', {'pk': pk})

@login_required
def products_request(request):
    return render(request, 'frontend/products.html')

@permission_required('expenses.view_expenses')
def expenses_request(request):
    return render(request, 'frontend/expenses.html')

@permission_required('widgets.view_dashboards')
def charts_request(request):
    return render(request, 'frontend/charts.html')