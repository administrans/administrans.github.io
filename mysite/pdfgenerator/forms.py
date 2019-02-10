# -*- coding: utf-8 -*-
from django import forms
from django.contrib.admin import widgets

class ProcurationForm(forms.Form):
    procurantfirstname = forms.CharField(label="Prenom de la personne faisant la procuration")
    procurantlastname = forms.CharField(label="Nom de famille de la personne faisant la procuration")
    procurantlistofname = forms.CharField(label="Liste des prénoms de la personne faisant la procuration")
    procuranttelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    procurantdob = forms.DateField(label="Date de naissance de la personne faisant la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    procurantpob = forms.CharField(label="Lieu (Département) de naissance de la personne faisant la procuration")
    procurantaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    procurantaddress2 = forms.CharField(label="Code postal et Ville")
    procurantlocation = forms.CharField(label="Lieu où est faite la procuration")
    procurantemail = forms.EmailField(label="Email procurant")
    procurantgender = forms.ChoiceField(choices=((0, "féminin"), (1, "masculin")))
    procurantdeadname = forms.CharField(label="Deadname de la personne faisant la procuration (seulement le prénom)")
    debutprocuration = forms.DateField(label="Date début procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    finprocuration = forms.DateField(label="Fin de la procuration", widget=forms.SelectDateWidget())
    personfirstname = forms.CharField(label="Prénom de la personne a qui est faite la procuration")
    personlastname = forms.CharField(label="Nom de famille de la personne a qui est faite la procuration")
    personlistofname = forms.CharField(label="Liste des prénoms de la personne a qui est faite la procuration")
    persondob = forms.DateField(label="Date de naissance de la personne a qui est faite la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    personpob = forms.CharField(label="Lieu (Département) de naissance de la personne a qui est faite la procuration")
    persontelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    personlocation = forms.CharField(label="Lieu où est faite la procuration")
    personemail = forms.EmailField(label="Email procurant")
    personaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    personaddress2 = forms.CharField(label="Code postal et Ville")
    persongender = forms.ChoiceField(choices=((0, "féminin"), (1, "masculin")))


class CPAMProcuration(ProcurationForm):
    procurantdepartement = forms.CharField(label="Département de la caisse de CPAM de la personne faisant la procuration")
    procurantss = forms.IntegerField(label="Numéro de sécu")

class EcoleProcuration(ProcurationForm):
    procurantecole = forms.CharField(label="École/Université de la personne faisant la procuration")

class BanqueProcuration(ProcurationForm):
    procurantbanque = forms.CharField(label="Banque de la personne faisant la procuration")

class EntrepriseProcuration(ProcurationForm):
    procurantentreprise = forms.CharField(label="Entreprise de la personne faisant la procuration")
    procurantcontrat = forms.CharField(label="Numéro de contrat")

class FreeProcuration(ProcurationForm):
    pass

class ImpotsProcuration(ProcurationForm):
    procurantimpots = forms.CharField(label="Ville dont on dépond pour les impots")
    procurantfiscal = forms.CharField(label="Numéro fiscal")
