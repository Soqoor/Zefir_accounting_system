from django.urls import path
from .views import orders_request

app_name = 'frontend'
urlpatterns = [
    path('', orders_request),
    path('orders/', orders_request),
    # path('orders/<int:pk>/', SingleOrderView.as_view(), name='order_detail'),
    # path('items/', OrderItemView.as_view()),
    # path('items/<int:pk>', SingleOrderItemViev.as_view()),
]
