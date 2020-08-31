from django.urls import path
from .views import data_load, data_correct

app_name = 'datatransfer'
urlpatterns = [
    path('dataload/', data_load),
    path('datacorrect/', data_correct),
]
