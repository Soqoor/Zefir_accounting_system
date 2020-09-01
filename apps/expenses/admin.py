from django.contrib import admin
from .models import Expenses, ExpensesCategory

admin.site.register(Expenses)
admin.site.register(ExpensesCategory)
