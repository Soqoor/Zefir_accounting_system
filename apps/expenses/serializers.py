from rest_framework.serializers import ModelSerializer
from .models import ExpensesCategory, Expenses


class ExpensesCategorySerializer(ModelSerializer):

    class Meta:
        model = ExpensesCategory
        fields = [
            'id',
            'name'
        ]


class ExpensesSerializer(ModelSerializer):

    class Meta:
        model = Expenses
        fields = [
            'id',
            'created',
            'date',
            'name',
            'value',
            'category'
        ]
