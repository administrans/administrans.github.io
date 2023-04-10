var ChgmtPrenomForm = {
    path: { category: "attestation", id: "chgmtprenom" },
    pagetitle: "Nouvelle attestation de changement de prénom",
    pagesubtitle: "Génération de la lettre",
    fieldsets: [
        {
            legend: "Informations de la personne trans",
            fields: [
                { 'type': "text", 'id': "procurantfirstname", 'label': "Prénom (le vrai hein) de la personne trans" },
                { 'type': "text", 'id': "procurantlastname", 'label': "Nom de famille de la personne trans" },
                { 'type': "text", 'id': "procurantlistofname", 'label': "Liste des prénoms (les vrais) de la personne trans", 'placeholder': "Émilie, Delphine, Coralie" },
                { 'type': "date", 'id': "procurantdob", 'label': "Date de naissance de la personne trans" },
                { 'type': "text", 'id': "procurantpob", 'label': "Lieu et département (ou pays) de naissance de la personne trans", 'placeholder': "Nantes (Loire-Atlantique)" },
                { 'type': "text", 'id': "procurantaddress1", 'label': "Adresse" },
                { 'type': "text", 'id': "procurantaddress2", 'label': "Code postal et Ville" },
                { 'type': "select", 'id': "procurantgender", 'label': "Accords de la personne", 'choices': [[0,"féminin"], [2,"neutre"], [1,"masculin"]] },
                { 'type': "text", 'id': "procurantville", 'label': "Ville dont la personne dépend pour l'État-Civil" },
                { 'type': "checkbox", 'id': "personignoredeadname", 'label': "La personne faisant l'attestation ignore le deadname" },
                { 'type': "text", 'id': "procurantdeadname", 'label': "Deadname de la personne (seulement le prénom) (et seulement si la personne connait le deadname)" },
            ]
        },
        {
            legend: "Informations de la personne qui fait l'attestation",
            fields: [
                { 'type': "text", 'id': "personfirstname", 'label': "Prénom de la personne qui fait l'attestation" },
                { 'type': "text", 'id': "personlastname", 'label': "Nom de famille de la personne qui fait l'attestation" },
                { 'type': "text", 'id': "personlistofname", 'label': "Liste des prénoms de la personne qui fait l'attestation", 'placeholder': "Corentin, Sebastien, Pierre" },
                { 'type': "date", 'id': "persondob", 'label': "Date de naissance de la personne qui fait l'attestation" },
                { 'type': "text", 'id': "personpob", 'label': "Lieu et département (ou pays) de naissance de la personne qui fait l'attestation", 'placeholder': "Nantes (Loire-Atlantique)" },
                { 'type': "text", 'id': "persontelephone", 'label': "Numéro de téléphone", 'placeholder': "+33612345678" }, // regex=r'^(\+33|0|0033)\d{9}$',
                { 'type': "text", 'id': "personlocation", 'label': "Lieu où est faite la lettre" },
                { 'type': "date", 'id': "date", 'label': "Date de l'attestation" },
                { 'type': "text", 'id': "personemail", 'label': "Addresse de courriel de la personne qui fait l'attestation" },
                { 'type': "text", 'id': "personaddress1", 'label': "Adresse" },
                { 'type': "text", 'id': "personaddress2", 'label': "Code postal et Ville" },
                { 'type': "select", 'id': "persongender", 'label': "Accords de la personne", 'choices': [[0,"féminin"], [2,"neutre"], [1,"masculin"]] },
            ]
        }
    ]
  };
  
  var procurant_identity_fieldset = {
    legend:'Identité de la personne faisant la procuration',
    fields:[
        { 'type': "text", 'id': "procurantfirstname", 'label': "Prénom" },
        { 'type': "text", 'id': "procurantlastname", 'label': "Nom de famille" },
        { 'type': "text", 'id': "procurantlistofname", 'label': "Liste des prénoms", 'placeholder': "Corentin, Sebastien, Pierre" },
        { 'type': "select", 'id': "procurantgender", 'label': "Accords", 'choices': [[0,"féminin"], [2,"neutre"], [1,"masculin"]] },
        { 'type': "text", 'id': "procurantdeadname", 'label': "Deadname (seulement le prénom)" },
        { 'type': "date", 'id': "procurantdob", 'label': "Date de naissance" },
        { 'type': "text", 'id': "procurantpob", 'label': "Lieu et département (ou pays) de naissance", 'placeholder': "Nantes (Loire-Atlantique)" },
    ]
  };
  
  var procurant_contact_fieldset = {
    legend:'Coordonnées de la personne faisant la procuration',
    fields:[
        { 'type': "text", 'id': "procurantemail", 'label': "Addresse de courriel de la personne qui fait l'attestation" },
        { 'type': "text", 'id': "procuranttelephone", 'label': "Numéro de téléphone", 'placeholder': "+33612345678" }, // regex=r'^(\+33|0|0033)\d{9}$',
        { 'type': "text", 'id': "procurantaddress1", 'label': "Adresse" },
        { 'type': "text", 'id': "procurantaddress2", 'label': "Code postal et Ville" },
    ]
  };
  
  var person_identity_fieldset = {
    legend:'Identité de la personne recevant la procuration',
    field:[
        { 'type': "text", 'id': "personfirstname", 'label': "Prénom" },
        { 'type': "text", 'id': "personlastname", 'label': "Nom de famille" },
        { 'type': "text", 'id': "personlistofname", 'label': "Liste des prénoms", 'placeholder': "Émilie, Delphine, Coralie" },
        { 'type': "select", 'id': "persongender", 'label': "Accords de la personne", 'choices': [[0,"féminin"], [2,"neutre"], [1,"masculin"]] },
        { 'type': "date", 'id': "persondob", 'label': "Date de naissance" },
        { 'type': "text", 'id': "personpob", 'label': "Lieu et département (ou pays) de naissance", 'placeholder': "Nantes (Loire-Atlantique)" },
    ]
  };
  
  var person_contact_fieldset = {
    legend:'Coordonnées de la personne recevant la procuration',
    fields:[
        { 'type': "text", 'id': "personemail", 'label': "Addresse de courriel de la personne qui fait l'attestation" },
        { 'type': "text", 'id': "persontelephone", 'label': "Numéro de téléphone", 'placeholder': "+33612345678" }, // regex=r'^(\+33|0|0033)\d{9}$',
        { 'type': "text", 'id': "personaddress1", 'label': "Adresse" },
        { 'type': "text", 'id': "personaddress2", 'label': "Code postal et Ville" },
    ]
  };
  
  var procuration_fieldset = {
    legend:'Informations relatives à la procuration',
    fields:[
        { 'type': "text", 'id': "procurantlocation", 'label': "Lieu où est faite la procuration" },
        { 'type': "date", 'id': "debutprocuration", 'label': "Début de la procuration" },
        { 'type': "date", 'id': "finprocuration", 'label': "Fin de la procuration" },
    ]
  }
  
  var lettre_fieldset = {
    legend: 'Informations relative à la lettre',
    fields: [
        { 'type': "text", 'id': "personlocation", 'label': "Lieu où est faite la lettre" },
    ]
  }
  
  //class ProcurationForm(FieldsetForm):
  var procuration_page_fieldsets = [
    procurant_identity_fieldset,
    procurant_contact_fieldset,
    person_identity_fieldset,
    person_contact_fieldset,
    procuration_fieldset,
    lettre_fieldset,
  ]
  
  var CPAMProcuration = {
    path: { category: "procuration", id: "cpam" },
    pagetitle: "Nouvelle procuration pour la CPAM",
    fieldsets: procuration_page_fieldsets.concat([{
        legend: "Informations relatives à la CPAM",
        fields: [   { 'type': "text", 'id': "procurantdepartement", 'label': "\"du/de l'/de la\" + département de la caisse de CPAM de la personne faisant la procuration, par ex. \"du Gard\" ou \"de l'Ain\" ou \"de la Gironde\""},
                    { 'type': "text", 'id': "procurantss", label: "Numéro de sécu"}]}])}
  
  var EcoleProcuration = {
    path: { category: "procuration", id: "ecole" },
    pagetitle: "Nouvelle procuration pour une École/Université",
    fieldsets: procuration_page_fieldsets.concat([{
        legend: "Informations relatives à l'École/Université",
        fields: [   { 'type': "text", 'id': "procurantecole", 'label': "École/Université de la personne faisant la procuration"}]}])}
  
  var BanqueProcuration = {
    path: { category: "procuration", id: "banque" },
    pagetitle: "Nouvelle procuration pour une Banque",
    fieldsets: procuration_page_fieldsets.concat([{
        legend: "Informations relatives à la banque",
        fields: [   { 'type': "text", 'id': "procurantbanque", 'label': "Banque de la personne faisant la procuration"}]}])}
  
  var EntrepriseProcuration = {
    path: { category: "procuration", id: "entreprise" },
    pagetitle: "Nouvelle procuration pour une entreprise avec numéro de contrat",
    fieldsets: procuration_page_fieldsets.concat([{
        legend: "Informations relatives à la banque",
        fields: [   { 'type': "text", 'id': "procurantentreprise", 'label': "Entreprise de la personne faisant la procuration"},
                    { 'type': "text", 'id': "procurantcontrat", 'label': "Numéro de contrat"}]}])}
  
  var FreeProcuration = {
    path: { category: "procuration", id: "free" },
    pagetitle: "Nouvelle procuration pour Free",
    fieldsets: procuration_page_fieldsets.concat([])}
  
  var ImpotsProcuration = {
    path: { category: "procuration", id: "impots" },
    pagetitle: "Nouvelle procuration pour les impôts",
    fieldsets: procuration_page_fieldsets.concat([{
            legend: "Informations relatives à la banque",
            fields: [
                { 'type': "text", 'id': "procurantimpots", 'label': "Ville dont on dépend pour les impots"},
                { 'type': "text", 'id': "procurantfiscal", 'label': "Numéro fiscal"}]}])}
  
  /*
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
  */