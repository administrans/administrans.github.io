# -*- coding: utf-8 -*-
from django.shortcuts import render
from django_tex.views import render_to_pdf

from .forms import CPAMProcuration, BanqueProcuration, EcoleProcuration, EntrepriseProcuration, FreeProcuration, ImpotsProcuration
from .forms import CPAMRelanceProcuration, BanqueRelanceProcuration, EcoleRelanceProcuration, EntrepriseRelanceProcuration, FreeRelanceProcuration, ImpotsRelanceProcuration
from .forms import CPAMStandalone, BanqueStandalone, EcoleStandalone, EntrepriseStandalone, FreeStandalone, ImpotsStandalone
from .forms import ChgmtPrenomForm
from . import forms
from . import lists
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

def context(obj):
    obj['lists'] = lists.LISTS.items()
    return obj

def list_letters_type(request):
    return render(request, "pdfgenerator/list_letters_type.html", context({}))

def list(request, category):
    list = lists.LISTS[category]
    list['category'] = category
    return render(request, "pdfgenerator/list.html", context({"list": list}))

def form(request, category, id):
    form_id = '{}_{}'.format(category, id)
    form_config = forms.REGISTERED_FORMS[form_id]
    form_class = form_config['form_class']
    latex_name = form_config.get('latex_name', 'pdfgenerator/latex/{}.tex'.format(form_id))
    form_context = form_config.copy()
    if request.method == "POST":
        form = form_class(request.POST)
        form_context['form'] = form
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="{}.pdf".format(form_id))
    else:
        form = form_class()
        form_context['form'] = form
    return render(request, "pdfgenerator/form.html", context(form_context))
