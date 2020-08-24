from django.urls import path
from .views import main_page, orders_request, order_edit, products_request

app_name = 'frontend'
urlpatterns = [
    path('', main_page),
    path('orders/', orders_request),
    path('orders/<int:pk>/', order_edit),
    path('products/', products_request),
    # path('items/<int:pk>', SingleOrderItemViev.as_view()),
]
