from django.urls import path
from .views import login_user, logout_user

app_name = 'users'
urlpatterns = [
    path('login/', login_user),
    path('logout/', logout_user),
]
