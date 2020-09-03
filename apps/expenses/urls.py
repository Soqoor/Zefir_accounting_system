from django.urls import path
from .views import ExpensesView, ExpensesCategoryView, SingleExpensesView, SingleExpensesCategoryView

app_name = 'expenses'
urlpatterns = [
    path('expenses/', ExpensesView.as_view()),
    path('expenses/<int:pk>/', SingleExpensesView.as_view()),
    path('expenses_cat/', ExpensesCategoryView.as_view()),
    path('expenses_cat/<int:pk>/', SingleExpensesCategoryView.as_view())
]
