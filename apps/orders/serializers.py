from rest_framework.serializers import ModelSerializer, StringRelatedField, ReadOnlyField
from .models import Order, OrderItem
from ..products.serializers import ProductSerializer


class OrderItemSerializer(ModelSerializer):
    catalog_text = ReadOnlyField()
    product_text = ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product',
            'order',
            'description',
            'amount',
            'price',
            'is_ready',
            'product_text',
            'catalog_text'
        ]


class OrderSerializer(ModelSerializer):
    orderitems = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'date_created',
            'date_planed',
            'date_deadline',
            'instagram',
            'phone',
            'name',
            'city',
            'np_department',
            'is_payed',
            'date_payed',
            'is_sent',
            'date_sent',
            'orderitems',
        ]
