from django.http import HttpResponse
from datetime import date, datetime
from ..catalog.models import Catalog
from ..products.models import Product
from ..orders.models import Order, OrderItem
from ..expenses.models import Expenses, ExpensesCategory

# testing tool. Making changes in DB to have good data to test all features in UI
def data_correct(request):
    orders_start = Order.objects.get(id=1858).date_planed
    expenses_start = Expenses.objects.get(id=541).date
    finish = datetime.now().date()
    orders_delta = finish - orders_start
    expenses_delta = finish - expenses_start
    for order in Order.objects.all():
        order.date_planed += orders_delta
        order.date_created += orders_delta
        if order.date_deadline:
            order.date_deadline += orders_delta
        order.save()
    for exp in Expenses.objects.all():
        exp.date += expenses_delta
        exp.save()
    new_exp = Expenses(
        date='2020-03-01',
        category=ExpensesCategory.objects.get(id=1),
        name='Тест для отрицательной прибыли',
        value=19000,
        )
    new_exp.save()
    
    return HttpResponse(f'Заказы сдвинуты на {orders_delta}, траты на {expenses_delta}')

# clear all database and transfer old data from datafiles
def data_load(request):
    start = datetime.now()
    OrderItem.objects.all().delete()
    Order.objects.all().delete()
    Product.objects.all().delete()
    Catalog.objects.all().delete()
    Expenses.objects.all().delete()
    ExpensesCategory.objects.all().delete()
    load_categories()
    load_products()
    load_orders()
    load_orderitems()
    load_expensescategory()
    load_expenses()
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
            date_created=lst[1],
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

def load_expensescategory():
    file = open('apps/datatransfer/data_files/expensescategory.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_cat = ExpensesCategory(
            id=int(lst[0]), 
            name=lst[1]
        )
        new_cat.save()
    return

def load_expenses():
    file = open('apps/datatransfer/data_files/expenses.tsv', encoding = 'utf-8', mode = 'r')
    for line in file:
        lst = line.rstrip().split('\t')
        if lst[0] == 'skip':
            continue
        new_exp = Expenses(
            id=int(lst[0]),
            date=lst[1],
            category=ExpensesCategory.objects.get(id=int(lst[2])),
            name=lst[3],
            value=int(lst[4]),
        )
        new_exp.save()
    return