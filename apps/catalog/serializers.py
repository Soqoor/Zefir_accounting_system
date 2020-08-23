from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Catalog


class CatalogSerializer(ModelSerializer):

    class Meta:
        model = Catalog
        fields = (
            'id',
            'category',
        )
