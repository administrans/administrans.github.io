# -*- coding: utf-8 -*-
from django import forms
from django.contrib.admin import widgets

REGISTERED_FORMS = {}


class Fieldset(object):
    def __init__(self, id, field_names, legend):
        self.id = id
        self.field_names = field_names
        self.legend = legend


class FieldsetForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if not field.widget.attrs.get('class'):
                field.widget.attrs['class'] = 'form-control'

    def get_fieldsets(self):
        # a list of tuples containing a Fieldset and a list of bound form fields
        # to display in a template
        fieldsets = []
        handled_fields = []
        try:
            declared_fieldsets = self.Meta.fieldsets
        except AttributeError:
            declared_fieldsets = []
        for fs in declared_fieldsets:
            fields = [self[field_name] for field_name in fs.field_names]
            fieldsets.append((fs, fields))
            handled_fields += fs.field_names

        # we include other fields in a fallback fieldset, at the end of the form
        remaining_fields = [k for k in self.fields if k not in handled_fields]
        if remaining_fields:
            fs = Fieldset(
                'procurant_id',
                legend='Autres informations',
                field_names=remaining_fields,
            )
            fields = [self[field_name] for field_name in fs.field_names]
            fieldsets.append((fs, fields))

        return fieldsets

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
class ChgmtPrenomForm(FieldsetForm):
    procurantfirstname = forms.CharField(label="Prénom (le vrai hein) de la personne trans")
    procurantlastname = forms.CharField(label="Nom de famille de la personne trans")
    procurantlistofname = forms.CharField(label="Liste des prénoms (les vrais) de la personne trans")
    procurantdob = forms.DateField(label="Date de naissance de la personne trans", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    procurantpob = forms.CharField(label="Lieu et département de naissance de la personne trans", widget=forms.TextInput(attrs={'placeholder': 'Nantes (Loire-Atlantique)'}))
    procurantaddress1 = forms.CharField(label="Adresse")
    procurantaddress2 = forms.CharField(label="Code postal et Ville")
    procurantgender = forms.ChoiceField(label="Accords de la personne", choices=((0, "féminin"), (1, "masculin")))
    procurantville = forms.CharField(label="Ville dont la personne dépend pour l'État-Civil")
    personignoredeadname = forms.ChoiceField(label="La personne faisant l'attestation ignore le deadname", choices=((0, "oui"), (1, "non")))
    procurantdeadname = forms.CharField(label="Deadname de la personne (seulement le prénom) (et seulement si la personne connait le deadname)", required=False)
    date = forms.DateField(label="Date de l'attestation", widget=forms.SelectDateWidget(attrs={'class': 'date-widget form-control'}))
    personfirstname = forms.CharField(label="Prénom de la personne qui fait l'attestation")
    personlastname = forms.CharField(label="Nom de famille de la personne qui fait l'attestation")
    personlistofname = forms.CharField(label="Liste des prénoms de la personne qui fait l'attestation")
    persondob = forms.DateField(label="Date de naissance de la personne qui fait l'attestation", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    personpob = forms.CharField(label="Lieu et département de naissance de la personne qui fait l'attestation", widget=forms.TextInput(attrs={'placeholder': 'Nantes (Loire-Atlantique)'}))
    persontelephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    personlocation = forms.CharField(label="Lieu où est faite la lettre")
    personemail = forms.EmailField(label="Email procurant")
    personaddress1 = forms.CharField(label="Adresse")
    personaddress2 = forms.CharField(label="Code postal et Ville")
    persongender = forms.ChoiceField(label="Accord de la personne", choices=((0, "féminin"), (1, "masculin")))


PROCURANT_IDENTITY_FIELDSETS = Fieldset(
    'procurant_id',
    legend='Identité de la personne faisant la procuration',
    field_names=[
        'procurantfirstname',
        'procurantlastname',
        'procurantlistofname',
        'procurantgender',
        'procurantdeadname',
        'procurantdob',
        'procurantpob',
    ]
)


PROCURANT_CONTACT_FIELDSETS = Fieldset(
    'procurant_id',
    legend='Coordonnées de la personne faisant la procuration',
    field_names=[
        'procurantemail',
        'procuranttelephone',
        'procurantaddress1',
        'procurantaddress2',
    ]
)
PERSON_IDENTITY_FIELDSETS = Fieldset(
    'person_id',
    legend='Identité de la personne recevant la procuration',
    field_names=[
        'personfirstname',
        'personlastname',
        'personlistofname',
        'persongender',
        'persondob',
        'personpob',
    ]
)

PERSON_CONTACT_FIELDSETS = Fieldset(
    'person_id',
    legend='Coordonnées de la personne recevant la procuration',
    field_names=[
        'personemail',
        'persontelephone',
        'personaddress1',
        'personaddress2',
    ]
)

PROCURATION_FIELDSETS = Fieldset(
    'procuration',
    legend='Informations relatives à la procuration',
    field_names=[
        'procurantlocation',
        'debutprocuration',
        'finprocuration',
    ]
)

class ProcurationForm(FieldsetForm):
    procurantfirstname = forms.CharField(label="Prénom")
    procurantlastname = forms.CharField(label="Nom de famille")
    procurantlistofname = forms.CharField(label="Liste des prénoms", widget=forms.TextInput(attrs={'placeholder': 'Corentin, Sebastien, Pierre'}))
    procuranttelephone = forms.RegexField(
        label="Numéro de téléphone",
        regex=r'^\+33\d{9}$',
        widget=forms.TextInput(attrs={'placeholder': '+33612345678'})
    )
    procurantdob = forms.DateField(label="Date de naissance", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    procurantpob = forms.CharField(label="Lieu et département de naissance", widget=forms.TextInput(attrs={'placeholder': 'Nantes (Loire-Atlantique)'}))
    procurantaddress1 = forms.CharField(label="Adresse")
    procurantaddress2 = forms.CharField(label="Code postal et Ville")
    procurantlocation = forms.CharField(label="Lieu où est faite la procuration")
    procurantemail = forms.EmailField(label="Email")
    procurantgender = forms.ChoiceField(label="Accords", choices=((0, "féminin"), (1, "masculin")))
    procurantdeadname = forms.CharField(label="Deadname (prénom)")
    debutprocuration = forms.DateField(label="Début de la procuration", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    finprocuration = forms.DateField(label="Fin de la procuration", widget=forms.SelectDateWidget(attrs={'class': 'date-widget form-control'}))
    personfirstname = forms.CharField(label="Prénom")
    personlastname = forms.CharField(label="Nom de famille")
    personlistofname = forms.CharField(label="Liste des prénoms", widget=forms.TextInput(attrs={'placeholder': 'Émilie, Delphine, Coralie'}))
    persondob = forms.DateField(label="Date de naissance", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    personpob = forms.CharField(label="Lieu et département de naissance", widget=forms.TextInput(attrs={'placeholder': 'Nantes (Loire-Atlantique)'}))
    persontelephone = forms.RegexField(
        label="Numéro de téléphone",
        regex=r'^\+33\d{9}$',
        widget=forms.TextInput(attrs={'placeholder': '+33612345678'})
    )
    personlocation = forms.CharField(label="Lieu où est faite la lettre")
    personemail = forms.EmailField(label="Email")
    personaddress1 = forms.CharField(label="Adresse")
    personaddress2 = forms.CharField(label="Code postal et Ville")
    persongender = forms.ChoiceField(label="Accord", choices=((0, "féminin"), (1, "masculin")))

    class Meta:
        fieldsets = [
            PROCURANT_IDENTITY_FIELDSETS,
            PROCURANT_CONTACT_FIELDSETS,
            PERSON_IDENTITY_FIELDSETS,
            PERSON_CONTACT_FIELDSETS,
            PROCURATION_FIELDSETS,
        ]

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
    datepremiercourrier = forms.DateField(label="Date du premier courrier", widget=forms.SelectDateWidget(years=range(2019, 3000), attrs={'class': 'date-widget form-control'}))

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

class StandaloneForm(FieldsetForm):
    firstname = forms.CharField(label="Prénom ")
    lastname = forms.CharField(label="Nom de famille ")
    listofname = forms.CharField(label="Liste des prénoms ")
    telephone = forms.RegexField(label="Numéro de téléphone (+33 suivi de 9 chiffres)", regex=r'^\+33\d{9}$')
    dob = forms.DateField(label="Date de naissance ", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))
    pob = forms.CharField(label="Lieu et département de naissance ")
    address1 = forms.CharField(label="Adresse")
    address2 = forms.CharField(label="Code postal et Ville")
    location = forms.CharField(label="Lieu où est faite la lettre")
    email = forms.EmailField(label="Email ")
    gender = forms.ChoiceField(label="Accords ", choices=((0, "féminin"), (1, "masculin")))
    deadname = forms.CharField(label="Deadname (prénom)")
    date = forms.DateField(label="Date du courrier", widget=forms.SelectDateWidget(years=range(1900, 3000), attrs={'class': 'date-widget form-control'}))

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
