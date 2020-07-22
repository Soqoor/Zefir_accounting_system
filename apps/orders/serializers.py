from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Order, OrderItem
from ..products.serializers import ProductSerializer


class OrderSerializer(ModelSerializer):
    orderitems = StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
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
        )


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'product',
            'order',
            'description',
            'amount',
            'price',
            'is_ready',
        )
