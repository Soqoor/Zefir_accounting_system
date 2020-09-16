from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import DjangoModelPermissions
from .serializers import ExpensesSerializer, ExpensesCategorySerializer
from .models import Expenses, ExpensesCategory
import copy

class CustomDjangoModelPermission(DjangoModelPermissions):

    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map)
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']

class ExpensesCategoryView(ListCreateAPIView):
    queryset = ExpensesCategory.objects.all()
    serializer_class = ExpensesCategorySerializer
    pagination_class = None
    permission_classes = [CustomDjangoModelPermission]

class SingleExpensesCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = ExpensesCategory.objects.all()
    serializer_class = ExpensesCategorySerializer
    permission_classes = [CustomDjangoModelPermission]

class ExpensesView(ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [CustomDjangoModelPermission]

class SingleExpensesView(RetrieveUpdateDestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [CustomDjangoModelPermission]
