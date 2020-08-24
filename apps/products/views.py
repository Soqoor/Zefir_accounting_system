from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import FilterSet
from .serializers import ProductSerializer
from .models import Product

class ProductFilter(FilterSet):

    class Meta:
        model = Product
        fields = {
            'name': ['icontains'],
            'catalog': ['exact']
        }


class ProductView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

class SingleProductView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer