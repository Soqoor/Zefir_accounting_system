from django.urls import path
from .views import main_page, orders_request, order_edit

app_name = 'frontend'
urlpatterns = [
    path('', main_page),
    path('orders/', orders_request),
    path('orders/<int:pk>/', order_edit),
    # path('items/', OrderItemView.as_view()),
    # path('items/<int:pk>', SingleOrderItemViev.as_view()),
]
