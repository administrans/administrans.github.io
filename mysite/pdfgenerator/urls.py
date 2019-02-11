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
    url(r"^procuration/relance/$", views.list_procuration_relance_type, name="list_procuration_relance_type"),
    url(r"^procuration/relance/cpam/$", views.form_CPAM_relance_procuration, name="form_CPAM_relance_procuration"),
    url(r"^procuration/relance/banque/$", views.form_banque_relance_procuration, name="form_banque_relance_procuration"),
    url(r"^procuration/relance/ecole/$", views.form_ecole_relance_procuration, name="form_ecole_relance_procuration"),
    url(r"^procuration/relance/entreprise/$", views.form_entreprise_relance_procuration, name="form_entreprise_relance_procuration"),
    url(r"^procuration/relance/free/$", views.form_free_relance_procuration, name="form_free_relance_procuration"),
    url(r"^procuration/relance/impots/$", views.form_impots_relance_procuration, name="form_impots_relance_procuration"),
    url(r"^standalone/$", views.list_standalone_type, name="list_standalone_type"),
    url(r"^standalone/cpam/$", views.form_CPAM_standalone, name="form_CPAM_standalone"),
    url(r"^standalone/ecole/$", views.form_ecole_standalone, name="form_ecole_standalone"),
    url(r"^standalone/banque/$", views.form_banque_standalone, name="form_banque_standalone"),
    url(r"^standalone/entreprise/$", views.form_entreprise_standalone, name="form_entreprise_standalone"),
    url(r"^standalone/free/$", views.form_free_standalone, name="form_free_standalone"),
    url(r"^standalone/impots/$", views.form_impots_standalone, name="form_impots_standalone"),
]
