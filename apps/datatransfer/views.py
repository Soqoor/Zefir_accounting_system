from django.http import HttpResponse
from datetime import date, datetime
from ..catalog.models import Catalog
from ..products.models import Product
from ..orders.models import Order, OrderItem


def data_correct(request):
    start = Order.objects.get(id=1858).date_planed
    finish = datetime.now().date()
    delta = finish - start
    for order in Order.objects.all():
        order.date_planed += delta
        order.save()
    return HttpResponse(f'Даты сдвинуты к актуальным значениям на {delta}')

def data_load(request):
    start = datetime.now()
    OrderItem.objects.all().delete()
    Order.objects.all().delete()
    Product.objects.all().delete()
    Catalog.objects.all().delete()
    load_categories()
    load_products()
    load_orders()
    load_orderitems()
    data_correct(request)
    finish = datetime.now()
    delta = finish - start
    return HttpResponse(f'Данные БД сброшены на значения поумолчанию за время: {delta}')

def load_categories():
    file = open('apps/datatransfer/data_files/category.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_cat = Catalog(
            id=int(lst[0]), 
            category=lst[1]
        )
        new_cat.save()
    return

def load_products():
    file = open('apps/datatransfer/data_files/products.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_prod = Product(
            id=int(lst[0]), 
            name=lst[2], 
            price_default=int(lst[3]), 
            catalog=Catalog.objects.get(id=int(lst[1]))
        )
        new_prod.save()
    return

def load_orders():
    file = open('apps/datatransfer/data_files/orders.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_order = Order(
            id=int(lst[0]),
            date_planed=lst[2],
            instagram=lst[4],
            is_payed=bool(int(lst[12])),
            is_sent=bool(int(lst[13]))
        )
        if lst[3]: new_order.date_deadline = lst[3]
        if lst[5]: new_order.name = lst[5]
        if lst[6]: new_order.phone = int(lst[6])
        if lst[7]: new_order.city = lst[7]
        if lst[8]: new_order.np_department = int(lst[8])
        if lst[9]: new_order.date_payed = lst[9]
        if lst[10]: new_order.date_sent = lst[10]
        new_order.save()
    return

def load_orderitems():
    file = open('apps/datatransfer/data_files/orderitems.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_orderitem = OrderItem(
            id=int(lst[0]),
            product=Product.objects.get(id=int(lst[2])),
            order=Order.objects.get(id=int(lst[1])),
            description=lst[3],
            amount=int(lst[5]),
            price=int(lst[4]),
            is_ready=bool(int(lst[6]))
        )
        new_orderitem.save()
    return
