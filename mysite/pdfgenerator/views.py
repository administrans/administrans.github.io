# -*- coding: utf-8 -*-
from django.shortcuts import render
from django_tex.views import render_to_pdf

from .forms import CPAMProcuration, BanqueProcuration, EcoleProcuration, EntrepriseProcuration, FreeProcuration, ImpotsProcuration
from .forms import CPAMRelanceProcuration, BanqueRelanceProcuration, EcoleRelanceProcuration, EntrepriseRelanceProcuration, FreeRelanceProcuration, ImpotsRelanceProcuration
from .forms import CPAMStandalone, BanqueStandalone, EcoleStandalone, EntrepriseStandalone, FreeStandalone, ImpotsStandalone
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

def form_CPAM_procuration(request):
    template_name = "pdfgenerator/form_CPAM_Procuration.html"
    latex_name = "pdfgenerator/procurationCPAM.tex"
    if request.method == "POST":
        form = CPAMProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationCPAM.pdf")
    else:
        form = CPAMProcuration()
    return render(request, template_name, {'form': form})

def form_ecole_procuration(request):
    template_name = "pdfgenerator/form_ecole_Procuration.html"
    latex_name = "pdfgenerator/procurationecole.tex"
    if request.method == "POST":
        form = EcoleProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationecole.pdf")
    else:
        form = EcoleProcuration()
    return render(request, template_name, {'form': form})

def form_banque_procuration(request):
    template_name = "pdfgenerator/form_banque_Procuration.html"
    latex_name = "pdfgenerator/procurationbanque.tex"
    if request.method == "POST":
        form = BanqueProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationbanque.pdf")
    else:
        form = BanqueProcuration()
    return render(request, template_name, {'form': form})

def form_entreprise_procuration(request):
    template_name = "pdfgenerator/form_entreprise_Procuration.html"
    latex_name = "pdfgenerator/procurationentreprise.tex"
    if request.method == "POST":
        form = EntrepriseProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationentreprise.pdf")
    else:
        form = EntrepriseProcuration()
    return render(request, template_name, {'form': form})

def form_free_procuration(request):
    template_name = "pdfgenerator/form_free_Procuration.html"
    latex_name = "pdfgenerator/procurationfree.tex"
    if request.method == "POST":
        form = FreeProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationfree.pdf")
    else:
        form = FreeProcuration()
    return render(request, template_name, {'form': form})


def form_impots_procuration(request):
    template_name = "pdfgenerator/form_impots_Procuration.html"
    latex_name = "pdfgenerator/procurationimpots.tex"
    if request.method == "POST":
        form = ImpotsProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationimpots.pdf")
    else:
        form = ImpotsProcuration()
    return render(request, template_name, {'form': form})

def form_CPAM_relance_procuration(request):
    template_name = "pdfgenerator/form_CPAM_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelanceCPAM.tex"
    if request.method == "POST":
        form = CPAMRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelanceCPAM.pdf")
    else:
        form = CPAMRelanceProcuration()
    return render(request, template_name, {'form': form})

def form_banque_relance_procuration(request):
    template_name = "pdfgenerator/form_banque_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelancebanque.tex"
    if request.method == "POST":
        form = BanqueRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelancebanque.pdf")
    else:
        form = BanqueRelanceProcuration()
    return render(request, template_name, {'form': form})

def form_entreprise_relance_procuration(request):
    template_name = "pdfgenerator/form_entreprise_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelanceentreprise.tex"
    if request.method == "POST":
        form = EntrepriseRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelanceentreprise.pdf")
    else:
        form = EntrepriseRelanceProcuration()
    return render(request, template_name, {'form': form})

def form_ecole_relance_procuration(request):
    template_name = "pdfgenerator/form_ecole_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelanceecole.tex"
    if request.method == "POST":
        form = EcoleRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelanceecole.pdf")
    else:
        form = EcoleRelanceProcuration()
    return render(request, template_name, {'form': form})

def form_free_relance_procuration(request):
    template_name = "pdfgenerator/form_free_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelancefree.tex"
    if request.method == "POST":
        form = FreeRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelancefree.pdf")
    else:
        form = FreeRelanceProcuration()
    return render(request, template_name, {'form': form})

def form_impots_relance_procuration(request):
    template_name = "pdfgenerator/form_impots_relance_Procuration.html"
    latex_name = "pdfgenerator/procurationrelanceimpots.tex"
    if request.method == "POST":
        form = ImpotsRelanceProcuration(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="procurationrelanceimpots.pdf")
    else:
        form = ImpotsRelanceProcuration()
    return render(request, template_name, {'form': form})


def form_CPAM_standalone(request):
    template_name = "pdfgenerator/form_CPAM_Standalone.html"
    latex_name = "pdfgenerator/standaloneCPAM.tex"
    if request.method == "POST":
        form = CPAMStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standaloneCPAM.pdf")
    else:
        form = CPAMStandalone()
    return render(request, template_name, {'form': form})

def form_ecole_standalone(request):
    template_name = "pdfgenerator/form_ecole_Standalone.html"
    latex_name = "pdfgenerator/standaloneecole.tex"
    if request.method == "POST":
        form = EcoleStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standaloneecole.pdf")
    else:
        form = EcoleStandalone()
    return render(request, template_name, {'form': form})

def form_banque_standalone(request):
    template_name = "pdfgenerator/form_banque_Standalone.html"
    latex_name = "pdfgenerator/standalonebanque.tex"
    if request.method == "POST":
        form = BanqueStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standalonebanque.pdf")
    else:
        form = BanqueStandalone()
    return render(request, template_name, {'form': form})

def form_entreprise_standalone(request):
    template_name = "pdfgenerator/form_entreprise_Standalone.html"
    latex_name = "pdfgenerator/standaloneentreprise.tex"
    if request.method == "POST":
        form = EntrepriseStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standaloneentreprise.pdf")
    else:
        form = EntrepriseStandalone()
    return render(request, template_name, {'form': form})

def form_free_standalone(request):
    template_name = "pdfgenerator/form_free_Standalone.html"
    latex_name = "pdfgenerator/standalonefree.tex"
    if request.method == "POST":
        form = FreeStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standalonefree.pdf")
    else:
        form = FreeStandalone()
    return render(request, template_name, {'form': form})


def form_impots_standalone(request):
    template_name = "pdfgenerator/form_impots_Standalone.html"
    latex_name = "pdfgenerator/standaloneimpots.tex"
    if request.method == "POST":
        form = ImpotsStandalone(request.POST)
        if form.is_valid():
            return render_to_pdf(request, latex_name, {'form': form}, filename="standaloneimpots.pdf")
    else:
        form = ImpotsStandalone()
    return render(request, template_name, {'form': form})

