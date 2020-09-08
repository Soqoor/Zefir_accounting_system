from django.urls import path
from .views import OrderView, SingleOrderView, OrderItemView, SingleOrderItemViev, clients_list, orders_count, Search

app_name = 'orders'
urlpatterns = [
    path('orders/', OrderView.as_view()),
    path('orders/<int:pk>/', SingleOrderView.as_view(), name='order_detail'),
    path('orders/search/', Search.as_view()),
    path('items/', OrderItemView.as_view()),
    path('items/<int:pk>/', SingleOrderItemViev.as_view()),
    path('clients/', clients_list),
    path('count/', orders_count),
]
