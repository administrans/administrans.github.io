from django.conf.urls import url
from . import forms
from . import views

FORM_URLS = []
for id, f in forms.REGISTERED_FORMS.items():
    # Generate all the URLs from our previously registered forms
    FORM_URLS.append(
        url(r'^{}/$'.format(f["url_path"]), views.get_form_view(id), name='form_{}'.format(id))
    )


urlpatterns = [
    url(r'^$', views.list_letters_type, name="list_letters_type"),
    url(r"^procuration/$", views.list_procuration_type, name="list_procuration_type"),
    url(r"^procuration/relance/$", views.list_procuration_relance_type, name="list_procuration_relance_type"),
    url(r"^standalone/$", views.list_standalone_type, name="list_standalone_type"),
] + FORM_URLS
