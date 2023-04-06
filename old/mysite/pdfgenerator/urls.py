from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    url(r'^$', views.list_letters_type, name="list_letters_type"),
    url(r'cec$', views.description_cec, name="description_cec"),
    path('<str:category>/', views.list, name='list'),
    path('<str:category>/<str:id>/', views.form, name='form')
]
