from django.urls import path
from .views import calendar

app_name = 'widgets'
urlpatterns = [
    path('calendar/', calendar),
]
