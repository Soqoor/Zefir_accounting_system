from django.urls import path
from .views import OrderView, SingleOrderView, OrderItemView, SingleOrderItemViev

app_name = 'orders'
urlpatterns = [
    path('orders/api/', OrderView.as_view()),
    path('orders/<int:pk>/api/', SingleOrderView.as_view(), name='order_detail'),
    path('items/api/', OrderItemView.as_view()),
    path('items/<int:pk>/api/', SingleOrderItemViev.as_view()),
]
