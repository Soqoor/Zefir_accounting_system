from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ExpensesSerializer, ExpensesCategorySerializer
from .models import Expenses, ExpensesCategory


class ExpensesCategoryView(ListCreateAPIView):
    queryset = ExpensesCategory.objects.all()
    serializer_class = ExpensesCategorySerializer
    pagination_class = None

class SingleExpensesCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = ExpensesCategory.objects.all()
    serializer_class = ExpensesCategorySerializer

class ExpensesView(ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

class SingleExpensesView(RetrieveUpdateDestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer