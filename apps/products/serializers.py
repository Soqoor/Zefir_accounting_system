from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Product
from ..catalog.serializers import CatalogSerializer


class ProductSerializer(ModelSerializer):
    catalog_text = ReadOnlyField()

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price_default',
            'catalog',
            'catalog_text'
        )
