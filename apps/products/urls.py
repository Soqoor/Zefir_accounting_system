from django.urls import path
from .views import ProductView, SingleProductView

app_name = 'products'
urlpatterns = [
    path('products/', ProductView.as_view()),
    path('products/<int:pk>/', SingleProductView.as_view(), name='product_detail'),
]
