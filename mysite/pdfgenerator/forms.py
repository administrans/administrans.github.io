# -*- coding: utf-8 -*-
from django import forms
from django.contrib.admin import widgets

REGISTERED_FORMS = {}


def register_form(category, id, title, url=None):
    """
    Register a form class with configuration options so it can be displayed
    automatically with the proper URL/template/title:

        @register_form(category='form_category', id='form_id', title='Hello')
        class MyFormClass():
            ...

    Would serve the form MyFormClass on /form_category/form_id, with the
    page title being "hello".

    If you provide the url argument, the form url will use that instead of the {category}/{id} scheme.
    """
    def decorator(form_class):
        if category:
            full_id = '{}_{}'.format(category, id)
            url_path = url or '{}/{}'.format(category, id)
        else:
            full_id = id
            url_path = url or id
        REGISTERED_FORMS[full_id] = {
            'form_class': form_class,
            'url_path': url_path,
            'title': title,
            'category': category,
        }
        return form_class

    return decorator


@register_form(category='attestation', id="chgmtprenom", title="Nouvelle attestation de changement de prénom")
class ChgmtPrenomForm(forms.Form):
    procurantfirstname = forms.CharField(label="Prénom (le vrai hein) de la personne trans")
    procurantlastname = forms.CharField(label="Nom de famille de la personne trans")
    procurantlistofname = forms.CharField(label="Liste des prénoms (les vrais) de la personne trans")
    procurantdob = forms.DateField(label="Date de naissance de la personne trans", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    procurantpob = forms.CharField(label="<Lieu (Département)> de naissance de la personne trans")
    procurantaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    procurantaddress2 = forms.CharField(label="Code postal et Ville")
    procurantgender = forms.ChoiceField(label="Accords de la personne", choices=((0, "féminin"), (1, "masculin")))
    procurantville = forms.CharField(label="Ville dont la personne dépend pour l'État-Civil")
    personignoredeadname = forms.ChoiceField(label="La personne faisant l'attestation ignore le deadname", choices=((0, "oui"), (1, "non")))
    procurantdeadname = forms.CharField(label="Deadname de la personne (seulement le prénom) (et seulement si la personne connait le deadname)", required=False)
    date = forms.DateField(label="Date de l'attestation", widget=forms.SelectDateWidget())
    personfirstname = forms.CharField(label="Prénom de la personne qui fait l'attestation")
    personlastname = forms.CharField(label="Nom de famille de la personne qui fait l'attestation")
    personlistofname = forms.CharField(label="Liste des prénoms de la personne qui fait l'attestation")
    persondob = forms.DateField(label="Date de naissance de la personne qui fait l'attestation", widget=forms.SelectDateWidget(years=range(1900, 3000)))
    personpob = forms.CharField(label="<Lieu (Département)> de naissance de la personne qui fait l'attestation")
    persontelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    personlocation = forms.CharField(label="Lieu où est faite la lettre")
    personemail = forms.EmailField(label="Email procurant")
    personaddress1 = forms.CharField(label="Numéro de voie, type de voie, nom de la voie")
    personaddress2 = forms.CharField(label="Code postal et Ville")
    persongender = forms.ChoiceField(label="Accord de la personne", choices=((0, "féminin"), (1, "masculin")))

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

@register_form(category='procuration', id="cpam", title="Nouvelle procuration pour la CPAM")
class CPAMProcuration(ProcurationForm):
    procurantdepartement = forms.CharField(label="Département de la caisse de CPAM de la personne faisant la procuration")
    procurantss = forms.IntegerField(label="Numéro de sécu")

@register_form(category='procuration', id="ecole", title="Nouvelle procuration pour une École/Université")
class EcoleProcuration(ProcurationForm):
    procurantecole = forms.CharField(label="École/Université de la personne faisant la procuration")

@register_form(category='procuration', id="banque", title="Nouvelle procuration pour une Banque")
class BanqueProcuration(ProcurationForm):
    procurantbanque = forms.CharField(label="Banque de la personne faisant la procuration")

@register_form(category='procuration', id="entreprise", title="Nouvelle procuration pour une entreprise avec numéro de contrat")
class EntrepriseProcuration(ProcurationForm):
    procurantentreprise = forms.CharField(label="Entreprise de la personne faisant la procuration")
    procurantcontrat = forms.CharField(label="Numéro de contrat")

@register_form(category='procuration', id="free", title="Nouvelle procuration pour Free")
class FreeProcuration(ProcurationForm):
    pass

@register_form(category='procuration', id="impots", title="Nouvelle procuration pour les impôts")
class ImpotsProcuration(ProcurationForm):
    procurantimpots = forms.CharField(label="Ville dont on dépend pour les impots")
    procurantfiscal = forms.CharField(label="Numéro fiscal")

class RelanceProcurationForm(ProcurationForm):
    datepremiercourrier = forms.DateField(label="Date du premier courrier", widget=forms.SelectDateWidget(years=range(2019, 3000)))

@register_form(category='procuration_relance', id="cpam", title="Relance procuration pour la CPAM", url='procuration/relance/cpam')
class CPAMRelanceProcuration(RelanceProcurationForm, CPAMProcuration):
    pass

@register_form(category='procuration_relance', id="ecole", title="Relance une École/Université", url='procuration/relance/ecole')
class EcoleRelanceProcuration(RelanceProcurationForm, EcoleProcuration):
    pass

@register_form(category='procuration_relance', id="banque", title="Relance pour une Banque", url='procuration/relance/banque')
class BanqueRelanceProcuration(RelanceProcurationForm, BanqueProcuration):
    pass

@register_form(category='procuration_relance', id="entreprise", title="Relance pour entreprise avec numéro de contrat", url='procuration/relance/entreprise')
class EntrepriseRelanceProcuration(RelanceProcurationForm, EntrepriseProcuration):
    pass

@register_form(category='procuration_relance', id="free", title="Relance pour Free", url='procuration/relance/free')
class FreeRelanceProcuration(RelanceProcurationForm, FreeProcuration):
    pass

@register_form(category='procuration_relance', id="impots", title="Relance pour les impôts", url='procuration/relance/impots')
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
    location = forms.CharField(label="Lieu où est faite la lettre")
    email = forms.EmailField(label="Email ")
    gender = forms.ChoiceField(label="Accords ", choices=((0, "féminin"), (1, "masculin")))
    deadname = forms.CharField(label="Deadname  (seulement le prénom)")
    date = forms.DateField(label="Date du courrier", widget=forms.SelectDateWidget(years=range(1900, 3000)))

@register_form(category='standalone', id="cpam", title="CPAM")
class CPAMStandalone(StandaloneForm):
    departement = forms.CharField(label="Département de la caisse de CPAM ")
    ss = forms.IntegerField(label="Numéro de sécu")

@register_form(category='standalone', id="ecole", title="École/Université")
class EcoleStandalone(StandaloneForm):
    ecole = forms.CharField(label="École/Université ")

@register_form(category='standalone', id="banque", title="Banque")
class BanqueStandalone(StandaloneForm):
    banque = forms.CharField(label="Banque ")

@register_form(category='standalone', id="entreprise", title="entreprise avec numéro de contrat")
class EntrepriseStandalone(StandaloneForm):
    entreprise = forms.CharField(label="Entreprise ")
    contrat = forms.CharField(label="Numéro de contrat")

@register_form(category='standalone', id="free", title="Free")
class FreeStandalone(StandaloneForm):
    pass

@register_form(category='standalone', id="impots", title="Impôts")
class ImpotsStandalone(StandaloneForm):
    impots = forms.CharField(label="Ville dont on dépend pour les impots")
    fiscal = forms.CharField(label="Numéro fiscal")
