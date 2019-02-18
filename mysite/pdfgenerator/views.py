# -*- coding: utf-8 -*-
from django.shortcuts import render
from django_tex.views import render_to_pdf

from .forms import CPAMProcuration, BanqueProcuration, EcoleProcuration, EntrepriseProcuration, FreeProcuration, ImpotsProcuration
from .forms import CPAMRelanceProcuration, BanqueRelanceProcuration, EcoleRelanceProcuration, EntrepriseRelanceProcuration, FreeRelanceProcuration, ImpotsRelanceProcuration
from .forms import CPAMStandalone, BanqueStandalone, EcoleStandalone, EntrepriseStandalone, FreeStandalone, ImpotsStandalone
from .forms import ChgmtPrenomForm
from . import forms
#from django.contrib.staticfiles.storage import staticfiles_storage
#from django.urls import reverse
#
#from jinja2 import Environment
#
#
#def environment(**options):
#    env = Environment(**options)
#    env.globals.update({
#        'static': staticfiles_storage.url,
#        'url': reverse,
#    })
#    return env

def list_letters_type(request):
    return render(request, "pdfgenerator/list_letters_type.html")

def list_procuration_type(request):
    return render(request, "pdfgenerator/list_procuration_type.html")


def list_standalone_type(request):
    return render(request, "pdfgenerator/list_standalone_type.html")

def list_procuration_relance_type(request):
    return render(request, "pdfgenerator/list_procuration_relance_type.html")


def get_form_view(form_id):
    """
    Given a form id such as "procuration_cpam", returns a view
    configured to serve that form using the config from forms.REGISTERED_FORMS
    """
    def view(request):
        form_config = forms.REGISTERED_FORMS[form_id]
        template_name = form_config.get('template_name', "pdfgenerator/form.html")
        form_class = form_config['form_class']
        latex_name = form_config.get('latex_name', 'pdfgenerator/latex/{}.tex'.format(form_id))
        context = form_config.copy()
        if request.method == "POST":
            form = form_class(request.POST)
            context['form'] = form
            if form.is_valid():
                return render_to_pdf(request, latex_name, {'form': form}, filename="{}.pdf".format(form_id))
        else:
            form = form_class()
            context['form'] = form
        return render(request, template_name, context)
    return view
