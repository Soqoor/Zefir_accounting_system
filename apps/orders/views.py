from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import OrderSerializer, OrderItemSerializer
from .models import Order, OrderItem




class OrderFilter(FilterSet):
    min_date_created = DateFilter(field_name="date_created", lookup_expr='gte')
    max_date_created = DateFilter(field_name="date_created", lookup_expr='lte')
    min_date_planed = DateFilter(field_name="date_planed", lookup_expr='gte')
    max_date_planed = DateFilter(field_name="date_planed", lookup_expr='lte')
    min_date_deadline = DateFilter(field_name="date_deadline", lookup_expr='gte')
    max_date_deadline = DateFilter(field_name="date_deadline", lookup_expr='lte')

    class Meta:
        model = Order
        fields = {'instagram': ['icontains'],
                  'phone': ['icontains'],
                  'name': ['icontains'],
                  'city': ['icontains'],
                  'is_payed': ['exact'],
                  'is_sent': ['exact'],
                  }


class OrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter


class SingleOrderView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemView(ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['order']


class SingleOrderItemViev(RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
