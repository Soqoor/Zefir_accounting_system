from django.urls import path
from .views import calendar, charts

app_name = 'widgets'
urlpatterns = [
    path('calendar/', calendar),
    path('charts/', charts),
]
