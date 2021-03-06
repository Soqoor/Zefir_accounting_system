from django.urls import path
from .views import main_page, login, orders_request, order_edit, products_request, expenses_request, charts_request

app_name = 'frontend'
urlpatterns = [
    path('', main_page),
    path('login/', login),
    path('orders/', orders_request),
    path('orders/search/', orders_request),
    path('orders/<int:pk>/', order_edit),
    path('products/', products_request),
    path('expenses/', expenses_request),
    path('charts/', charts_request),
]
