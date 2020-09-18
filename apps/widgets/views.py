from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required, permission_required
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
from ..orders.models import Order, OrderItem
from ..expenses.models import Expenses


@login_required
def calendar(request):
    response = {
        'missed': {
            'count': 0,
            'link': '',
        },
        'long_term': {
            'count': 0,
            'link': '',
        },
        'calendar': []
    }
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    weekday = today.weekday()
    start = today - timedelta(days=weekday)
    finish = start + timedelta(days=28)

    missed_orders = len(Order.objects.filter(date_planed__lt=today, is_sent=False))
    if (missed_orders):
        response['missed']['count'] = missed_orders
        response['missed']['link'] = f'/orders/?is_sent=false&max_date_planed={yesterday}'

    long_term_orders = len(Order.objects.filter(date_planed__gte=finish, is_sent=False))
    if (long_term_orders):
        response['long_term']['count'] = long_term_orders
        response['long_term']['link'] = f'/orders/?is_sent=false&min_date_planed={finish}'

    for weeks in range(4):
        week = []
        for days in range(7):
            day = start + timedelta(days = weeks * 7 + days)
            data = {
                'isodate' : day,
                'date': day.strftime("%d.%m.%Y"),
                'day': day.day
            }
            if day < today:
                data['count'] = 0
                data['link'] = ''
            else:
                data['count'] = len(Order.objects.filter(date_planed__exact=day, is_sent=False))
                data['link'] = f'/orders/?is_sent=false&max_date_planed={day}&min_date_planed={day}'
            week.append(data)
        response['calendar'].append(week)
            
    return JsonResponse(response)

@permission_required('widgets.view_dashboards')
def charts(request):
    response = {
        'labels': [],
        'orders': [],
        'expenses': [],
        'profit': []
    }
    today = datetime.now().date()
    for i in range(13):
        period_start = today.replace(day=1) + relativedelta(months=i-12)
        period_finish = today.replace(day=1) + relativedelta(months=i-11, days=-1)
        response['labels'].append(period_start.strftime("%b"))

        orders_sum = 0
        orders = Order.objects.filter(date_created__gte=period_start, date_created__lte=period_finish)
        for order in orders:
            orderitems = OrderItem.objects.filter(order=order)
            for orderitem in orderitems:
                orders_sum += orderitem.amount * orderitem.price
        response['orders'].append(orders_sum)

        expenses_sum = 0
        expenses = Expenses.objects.filter(date__gte=period_start, date__lte=period_finish)
        for expense in expenses:
            expenses_sum += expense.value
        response['expenses'].append(expenses_sum)

        response['profit'].append(orders_sum - expenses_sum)

            
    return JsonResponse(response)