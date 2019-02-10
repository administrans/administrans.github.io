# -*- coding: utf-8 -*-
from django.shortcuts import render
from django_tex.views import render_to_pdf

from .forms import CPAMProcuration, BanqueProcuration, EcoleProcuration, EntrepriseProcuration, FreeProcuration, ImpotsProcuration
from .forms import CPAMRelanceProcuration, BanqueRelanceProcuration, EcoleRelanceProcuration, EntrepriseRelanceProcuration, FreeRelanceProcuration, ImpotsRelanceProcuration

def list_letters_type(request):
    return render(request, "pdfgenerator/list_letters_type.html")

def list_procuration_type(request):
    return render(request, "pdfgenerator/list_procuration_type.html")

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

