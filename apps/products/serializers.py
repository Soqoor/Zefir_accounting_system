from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Product
from ..catalog.serializers import CatalogSerializer


class ProductSerializer(ModelSerializer):
    catalog = CatalogSerializer(many=False, read_only=True)

    class Meta:
        model = Product
        fields = (
            'name',
            'price_default',
            'catalog',
        )
