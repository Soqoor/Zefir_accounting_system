from django.urls import path
from .views import CatalogView, SingleCatalogView

app_name = 'catalog'
urlpatterns = [
    path('catalog/', CatalogView.as_view()),
    path('catalog/<int:pk>/', SingleCatalogView.as_view(), name='product_detail'),
]
