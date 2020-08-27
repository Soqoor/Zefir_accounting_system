from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from .serializers import OrderSerializer, OrderItemSerializer
from .models import Order, OrderItem
import datetime




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


class ClientFilter(FilterSet):

    class Meta:
        model = Order
        fields = {'instagram': ['icontains']}


class OrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter


class SingleOrderView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemPagination(PageNumberPagination):
    page_size = 100

class OrderItemView(ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['order']
    pagination_class = OrderItemPagination


class SingleOrderItemViev(RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


def clients_list(request):
    json = {
        'count': 0,
        'results': []
    }
    if not 'instagram' in request.GET or request.GET['instagram'] == '':
        return JsonResponse(json)

    orders = Order.objects.filter(instagram__icontains=request.GET['instagram']).order_by('instagram', 'phone', 'name', 'city', 'np_department')
    last_instagram = last_phone = last_name = last_city = last_np_department = ''
    for order in orders:
        if order.instagram == last_instagram:
            if order.phone == last_phone:
                if order.name == last_name:
                    if order.city == last_city:
                        if order.np_department == last_np_department:
                            continue
        last_instagram = order.instagram
        last_phone = order.phone
        last_name = order.name
        last_city = order.city
        last_np_department = order.np_department
        
        json['results'].append({
            'instagram': order.instagram,
            'phone': order.phone,
            'name': order.name,
            'city': order.city,
            'np_department': order.np_department,
        })

        json['count'] += 1

        if json['count'] == 10:
            break
    
    return JsonResponse(json)

def orders_count(request):
    json = {}

    orders_today = Order.objects.filter(date_planed__exact=datetime.date.today())
    orders_tomorrow = Order.objects.filter(date_planed__exact=datetime.date.today() + datetime.timedelta(days=1))
    orders_aftertomorrow = Order.objects.filter(date_planed__exact=datetime.date.today() + datetime.timedelta(days=2))
    orders_unsent = Order.objects.filter(is_sent__exact=False)
    orders_forgotten = orders_unsent.filter(date_planed__lt=datetime.date.today())
    orders_all = Order.objects.all()
        
    json['orders_today'] = len(orders_today)
    json['orders_tomorrow'] = len(orders_tomorrow)
    json['orders_aftertomorrow'] = len(orders_aftertomorrow)
    json['orders_unsent'] = len(orders_unsent)
    json['orders_forgotten'] = len(orders_forgotten)
    json['orders_all'] = len(orders_all)

    return JsonResponse(json)