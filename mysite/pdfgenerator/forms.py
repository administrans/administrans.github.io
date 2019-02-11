# -*- coding: utf-8 -*-
from django import forms
from django.contrib.admin import widgets

class ProcurationForm(forms.Form):
    procurantfirstname = forms.CharField(label="Prénom de la personne faisant la procuration")
    procurantlastname = forms.CharField(label="Nom de famille de la personne faisant la procuration")
    procurantlistofname = forms.CharField(label="Liste des prénoms de la personne faisant la procuration")
    procuranttelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    procurantdob = forms.DateField(label="Date de naissance de la personne faisant la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    procurantpob = forms.CharField(label="<Lieu (Département)> de naissance de la personne faisant la procuration")
    procurantaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    procurantaddress2 = forms.CharField(label="Code postal et Ville")
    procurantlocation = forms.CharField(label="Lieu où est faite la procuration")
    procurantemail = forms.EmailField(label="Email procurant")
    procurantgender = forms.ChoiceField(label="Accords de la personne faisant la procuration", choices=((0, "féminin"), (1, "masculin")))
    procurantdeadname = forms.CharField(label="Deadname de la personne faisant la procuration (seulement le prénom)")
    debutprocuration = forms.DateField(label="Début de la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    finprocuration = forms.DateField(label="Fin de la procuration", widget=forms.SelectDateWidget())
    personfirstname = forms.CharField(label="Prénom de la personne à qui est faite la procuration")
    personlastname = forms.CharField(label="Nom de famille de la personne à qui est faite la procuration")
    personlistofname = forms.CharField(label="Liste des prénoms de la personne à qui est faite la procuration")
    persondob = forms.DateField(label="Date de naissance de la personne à qui est faite la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    personpob = forms.CharField(label="<Lieu (Département)> de naissance de la personne à qui est faite la procuration")
    persontelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    personlocation = forms.CharField(label="Lieu où est faite la lettre")
    personemail = forms.EmailField(label="Email procurant")
    personaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    personaddress2 = forms.CharField(label="Code postal et Ville")
    persongender = forms.ChoiceField(label="Accord de la personne", choices=((0, "féminin"), (1, "masculin")))


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

class RelanceProcurationForm(ProcurationForm):
    datepremiercourrier = forms.DateField(label="Date du premier courrier", widget=forms.SelectDateWidget(years=range(2019, 3000)))

class CPAMRelanceProcuration(RelanceProcurationForm, CPAMProcuration):
    pass

class EcoleRelanceProcuration(RelanceProcurationForm, EcoleProcuration):
    pass

class BanqueRelanceProcuration(RelanceProcurationForm, BanqueProcuration):
    pass

class EntrepriseRelanceProcuration(RelanceProcurationForm, EntrepriseProcuration):
    pass

class FreeRelanceProcuration(RelanceProcurationForm, FreeProcuration):
    pass

class ImpotsRelanceProcuration(RelanceProcurationForm, ImpotsProcuration):
    pass

class StandaloneForm(forms.Form):
    firstname = forms.CharField(label="Prénom ")
    lastname = forms.CharField(label="Nom de famille ")
    listofname = forms.CharField(label="Liste des prénoms ")
    telephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    dob = forms.DateField(label="Date de naissance ", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    pob = forms.CharField(label="<Lieu (Département)> de naissance ")
    address1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    address2 = forms.CharField(label="Code postal et Ville")
    location = forms.CharField(label="Lieu où est faite la procuration")
    email = forms.EmailField(label="Email ")
    gender = forms.ChoiceField(label="Accords ", choices=((0, "féminin"), (1, "masculin")))
    deadname = forms.CharField(label="Deadname  (seulement le prénom)")
    date = forms.DateField(label="Date du courrier", widget=forms.SelectDateWidget(years=range(1900, 3000)))

class CPAMStandalone(StandaloneForm):
    departement = forms.CharField(label="Département de la caisse de CPAM ")
    ss = forms.IntegerField(label="Numéro de sécu")

class EcoleStandalone(StandaloneForm):
    ecole = forms.CharField(label="École/Université ")

class BanqueStandalone(StandaloneForm):
    banque = forms.CharField(label="Banque ")

class EntrepriseStandalone(StandaloneForm):
    entreprise = forms.CharField(label="Entreprise ")
    contrat = forms.CharField(label="Numéro de contrat")

class FreeStandalone(StandaloneForm):
    pass

class ImpotsStandalone(StandaloneForm):
    impots = forms.CharField(label="Ville dont on dépond pour les impots")
    fiscal = forms.CharField(label="Numéro fiscal")

