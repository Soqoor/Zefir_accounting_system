from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderItemSerializer
from .models import Order, OrderItem
from django.shortcuts import render


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100


class OrderFilter(FilterSet):
    min_date_created = DateFilter(field_name="date_created", lookup_expr='gte')
    max_date_created = DateFilter(field_name="date_created", lookup_expr='lte')
    min_date_planed = DateFilter(field_name="date_planed", lookup_expr='gte')
    max_date_planed = DateFilter(field_name="date_planed", lookup_expr='lte')

    class Meta:
        model = Order
        fields = ['min_date_created',
                  'max_date_created',
                  'min_date_planed',
                  'max_date_planed',
                  'is_payed',
                  'is_sent',
                  ]


class OrderView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter
    pagination_class = StandardResultsSetPagination



# class SingleOrderView(RetrieveUpdateDestroyAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#
#
# class OrderItemView(ListCreateAPIView):
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['order']
#     pagination_class = StandardResultsSetPagination
#
#
# class SingleOrderItemViev(RetrieveUpdateDestroyAPIView):
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
#
#
# def orders_request(request):
#     queryset = OrderItem.objects.all()
#     return render(request, 'orders/OrderItem.html', {'queryset': queryset})
#
#
# def orders_request2(request):
#     queryset = OrderView().get_queryset()
#     return render(request, 'orders/OrderItem2.html', {'queryset': queryset})
