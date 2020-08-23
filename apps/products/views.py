from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import FilterSet
from rest_framework.pagination import PageNumberPagination
from .serializers import ProductSerializer
from .models import Product

class ProductFilter(FilterSet):

    class Meta:
        model = Product
        fields = {
            'name': ['icontains'],
            'catalog': ['exact']
        }

class ProductPagination(PageNumberPagination):
    page_size = 10

class ProductView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = None
    filterset_class = ProductFilter
    pagination_class = ProductPagination

class SingleProductView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer