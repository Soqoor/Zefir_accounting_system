from django.urls import path
from .views import OrderView, SingleOrderView, OrderItemView, SingleOrderItemViev, Client

app_name = 'orders'
urlpatterns = [
    path('orders/', OrderView.as_view()),
    path('orders/<int:pk>/', SingleOrderView.as_view(), name='order_detail'),
    path('items/', OrderItemView.as_view()),
    path('items/<int:pk>/', SingleOrderItemViev.as_view()),
    path('clients/', Client.as_view()),
]
