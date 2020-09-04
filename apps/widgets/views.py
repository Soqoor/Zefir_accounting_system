from django.http import JsonResponse, HttpResponse
from datetime import date, datetime, timedelta
from ..orders.models import Order, OrderItem


def calendar(request):
    response = {
        'missed': {
            'count': 0,
            'link': '',
        },
        'calendar': []
    }
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    weekday = today.weekday()
    start = today - timedelta(days=weekday)

    missed_orders = len(Order.objects.filter(date_planed__lt=today, is_sent=False))
    if (missed_orders):
        response['missed']['count'] = missed_orders
        response['missed']['link'] = f'/orders/?is_sent=false&max_date_planed={yesterday}/'

    for i in range(32):
        day = start + timedelta(days=i)
        data = {'day': day.day}
        if day <= today:
            data['count'] = 0
            data['link'] = ''
        else:
            data['count'] = len(Order.objects.filter(date_planed__exact=day, is_sent=False))
            data['link'] = f'/orders/?max_date_planed={day}&min_date_planed={day}'
        response['calendar'].append(data)

    return JsonResponse(response)
