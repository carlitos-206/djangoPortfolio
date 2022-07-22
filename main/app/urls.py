from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index),
    path("resume", views.resume),
    path("getAPI", views.getAPI)
]