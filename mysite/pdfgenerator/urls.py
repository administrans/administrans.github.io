from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.list_letters_type, name="list_letters_type"),
    url(r"^procuration/$", views.list_procuration_type, name="list_procuration_type"),
    url(r"^procuration/cpam/$", views.form_CPAM_procuration, name="form_CPAM_procuration"),
    url(r"^procuration/ecole/$", views.form_ecole_procuration, name="form_ecole_procuration"),
    url(r"^procuration/banque/$", views.form_banque_procuration, name="form_banque_procuration"),
    url(r"^procuration/entreprise/$", views.form_entreprise_procuration, name="form_entreprise_procuration"),
    url(r"^procuration/free/$", views.form_free_procuration, name="form_free_procuration"),
    url(r"^procuration/impots/$", views.form_impots_procuration, name="form_impots_procuration"),
]
