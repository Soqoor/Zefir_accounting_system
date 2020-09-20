from django.shortcuts import redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_user(request):
    body = json.loads(request.body)
    username = body['username']
    password = body['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        response = {
            'url': '/'
        }
    else:
        response = {
            'url': '/login/'
        }
    return JsonResponse(response)

def logout_user(request):
    logout(request)
    response = {
            'url': '/login/'
        }
    return JsonResponse(response)
