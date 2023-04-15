site_trans_cec.forms = (function(){
  var forms = {}
  forms.attestation = {}
  forms.attestation.chgmtprenom = {
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
  };
  
  var lettre_fieldset = {
    legend: 'Informations relative à la lettre',
    fields: [
        { 'type': "text", 'id': "personlocation", 'label': "Lieu où est faite la lettre" },
    ]
  };
  
  //class ProcurationForm(FieldsetForm):
  var procuration_page_fieldsets = [
    procurant_identity_fieldset,
    procurant_contact_fieldset,
    person_identity_fieldset,
    person_contact_fieldset,
    procuration_fieldset,
    lettre_fieldset,
  ];
    
  forms.procuration = {
    cpam: {
      path: { category: "procuration", id: "cpam" },
      linktext: "CPAM",
      pagetitle: "Nouvelle procuration pour la CPAM",
      description: "Pour exiger des modifications auprès de la CPAM de votre département.",
      fieldsets: procuration_page_fieldsets.concat([{
          legend: "Informations relatives à la CPAM",
          fields: [   { 'type': "text", 'id': "procurantdepartement", 'label': "\"du/de l'/de la\" + département de la caisse de CPAM de la personne faisant la procuration, par ex. \"du Gard\" ou \"de l'Ain\" ou \"de la Gironde\""},
                      { 'type': "text", 'id': "procurantss", label: "Numéro de sécu"}]}])},
    ecole: {
      path: { category: "procuration", id: "ecole" },
      linktext: "École/Université",
      pagetitle: "Nouvelle procuration pour une École/Université",
      description: "Pour exiger des modifications auprès du service scolarité d&#39;une école/université (exemple : nouveau diplôme)",
      fieldsets: procuration_page_fieldsets.concat([{
          legend: "Informations relatives à l'École/Université",
          fields: [   { 'type': "text", 'id': "procurantecole", 'label': "École/Université de la personne faisant la procuration"}]}])},
    banque: {
      path: { category: "procuration", id: "banque" },
      linktext: "Banque",
      pagetitle: "Nouvelle procuration pour une Banque",
      description: "Pour exiger des modifications aupres de votre banque.",
      fieldsets: procuration_page_fieldsets.concat([{
          legend: "Informations relatives à la banque",
          fields: [   { 'type': "text", 'id': "procurantbanque", 'label': "Banque de la personne faisant la procuration"}]}])},
    entreprise: {
      path: { category: "procuration", id: "entreprise" },
      linktext: "Entreprise avec un numéro de contrat",
      pagetitle: "Nouvelle procuration pour une entreprise avec un numéro de contrat",
      description: "Pour exiger des modifications à une entreprise (numéro de contrat exigé)",
      fieldsets: procuration_page_fieldsets.concat([{
          legend: "Informations relatives à la banque",
          fields: [   { 'type': "text", 'id': "procurantentreprise", 'label': "Entreprise de la personne faisant la procuration"},
                      { 'type': "text", 'id': "procurantcontrat", 'label': "Numéro de contrat"}]}])},
    free: {
      path: { category: "procuration", id: "free" },
      linktext: "Free",
      pagetitle: "Nouvelle procuration pour Free",
      description: "Pour exiger des modifications auprès du service client de Free",
      fieldsets: procuration_page_fieldsets.concat([])},
    impots: {
      path: { category: "procuration", id: "impots" },
      linktext: "Impôts",
      pagetitle: "Nouvelle procuration pour les impôts",
      description: "Pour exiger des modifications au SIP dont vous dépendez",
      fieldsets: procuration_page_fieldsets.concat([{
              legend: "Informations relatives à la banque",
              fields: [
                  { 'type': "text", 'id': "procurantimpots", 'label': "Ville dont on dépend pour les impots"},
                  { 'type': "text", 'id': "procurantfiscal", 'label': "Numéro fiscal"}]}])},
    poleemploi: {
      path: { category: "procuration", id: "poleemploi" },
      linktext: "Pôle emploi",
      pagetitle: "Nouvelle procuration pour Pôle Emploi",
      description: "Pour exiger des modifications à votre Pôle Emploi",
      fieldsets: procuration_page_fieldsets.concat([{
              legend: "Informations relatives à Pôle Emploi",
              fields: [
                  { 'type': "text", 'id': "procurantentite", 'label': "Ville/Département du Pôle Emploi"},
                  { 'type': "text", 'id': "procurantnumero", 'label': "Numéro Pôle Emploi"}]}])},
    edf: {
      path: { category: "procuration", id: "edf" },
      linktext: "EDF",
      pagetitle: "Nouvelle procuration pour EDF",
      description: "Pour tout ce qui a trait à EDF",
      fieldsets: procuration_page_fieldsets.concat([{
              legend: "Informations relatives à EDF",
              fields: [
                  { 'type': "text", 'id': "procurantclient_id", 'label': "Numéro client"}]}])},
    assurance: {
      path: { category: "procuration", id: "assurance" },
      linktext: "Assurance",
      pagetitle: "Nouvelle procuration pour une assurance",
      description: "Pour tout ce qui a trait à vos assurances",
      fieldsets: procuration_page_fieldsets.concat([{
              legend: "Informations relatives à l'assurance",
              fields: [
                  { 'type': "text", 'id': "procurantinsurance", 'label': "Nom de l'assurance"},
                  { 'type': "text", 'id': "procurantinsurance_id", 'label': "Numéro client"}]}])},
    conciliateurcpam: {
      path: { category: "procuration", id: "conciliateurcpam" },
      linktext: "Conciliateur de la CPAM",
      pagetitle: "Nouvelle procuration pour contacter le service conciliateur CPAM",
      description: "Pour quand la demande à la CPAM échoue, pensez à contacter le conciliateur de la CPAM. Vous trouverez son mail sur le site de votre caisse.",
      fieldsets: procuration_page_fieldsets.concat([{
              legend: "Informations relatives à la CPAM",
              fields: [
                  { 'type': "text", 'id': "procurantdepartement", 'label': "Département de la caisse de CPAM"},
                  { 'type': "text", 'id': "procurantss", 'label': "Numéro de sécu"}]}])},
  };

  var relance_fieldset = {
    legend: "Relance",
    fields: [
      { 'type': "date", 'id': "datepremiercourrier", 'label':"Date du premier courrier" }
    ]
  };

  forms.procuration_relance = {};
  for (form in forms.procuration) {
    if (forms.procuration.hasOwnProperty(form)) {
      forms.procuration_relance[form] = {
        path: { category: "procuration_relance", id: form },
        linktext: forms.procuration[form].linktext,
        pagetitle: forms.procuration[form].pagetitle,
        description: forms.procuration[form].description,
        pagesubtitle: forms.procuration[form].pagesubtitle,
        fieldsets: forms.procuration[form].fieldsets.concat([relance_fieldset]),
      }
    } else {
      if (console) {
        console.log('warning: skipping !hasOwnProperty(', form, ') in ', forms.procuration);
      }
    }
  }

  var standalone_identity_fieldset = {
    legend: 'Identité',
    fields:[
      { 'type': "text", 'id': "firstname", 'label': "Prénom" },
      { 'type': "text", 'id': "lastname", 'label': "Nom de famille" },
      { 'type': "text", 'id': "listofname", 'label': "Liste des prénoms", 'placeholder': "Émilie, Delphine, Coralie" },
      { 'type': "text", 'id': "deadname", 'label': "Deadname (prénom)" },
      { 'type': "select", 'id': "gender", 'label': "Accords de la personne", 'choices': [[0,"féminin"], [2,"neutre"], [1,"masculin"]] },
      { 'type': "date", 'id': "dob", 'label': "Date de naissance" },
      { 'type': "text", 'id': "pob", 'label': "Lieu et département (ou pays) de naissance", 'placeholder': "Nantes (Loire-Atlantique)" },
    ]
  };

  var standalone_contact_fieldset = {
    legend:'Coordonnées',
    fields:[
      { 'type': "text", 'id': "email", 'label': "Addresse de courriel" },
      { 'type': "text", 'id': "telephone", 'label': "Numéro de téléphone", 'placeholder': "+33612345678" }, // regex=r'^(\+33|0|0033)\d{9}$',
      { 'type': "text", 'id': "address1", 'label': "Adresse" },
      { 'type': "text", 'id': "address2", 'label': "Code postal et Ville" },
    ]
  };

  var standalone_lettre_fieldset = {
    legend: 'Informations relative à la lettre',
    fields: [
        { 'type': "text", 'id': "location", 'label': "Lieu où est faite la lettre" },
        { 'type': "date", 'id': "date", 'label': "Date du courrier" },
    ]
  };

  var standalone_page_fieldsets = [
    standalone_identity_fieldset,
    standalone_contact_fieldset,
    standalone_lettre_fieldset
  ];

  // TODO: factorize with forms.procuration
  forms.standalone = {
    cpam: {
      path: { category: "standalone", id: "cpam" },
      pagetitle: "Nouvelle lettre pour la CPAM",
      fieldsets: standalone_page_fieldsets.concat([{
          legend: "Informations relatives à la CPAM",
          fields: [   { 'type': "text", 'id': "departement", 'label': "\"du/de l'/de la\" + département de la caisse de CPAM de la personne faisant la procuration, par ex. \"du Gard\" ou \"de l'Ain\" ou \"de la Gironde\""},
                      { 'type': "text", 'id': "ss", label: "Numéro de sécu"}]}])},
    ecole: {
      path: { category: "standalone", id: "ecole" },
      pagetitle: "Nouvelle lettre pour une École/Université",
      fieldsets: standalone_page_fieldsets.concat([{
          legend: "Informations relatives à l'École/Université",
          fields: [   { 'type': "text", 'id': "ecole", 'label': "École/Université de la personne faisant la procuration"}]}])},
    banque: {
      path: { category: "standalone", id: "banque" },
      pagetitle: "Nouvelle lettre pour une Banque",
      fieldsets: standalone_page_fieldsets.concat([{
          legend: "Informations relatives à la banque",
          fields: [   { 'type': "text", 'id': "banque", 'label': "Banque de la personne faisant la procuration"}]}])},
    entreprise: {
      path: { category: "standalone", id: "entreprise" },
      pagetitle: "Nouvelle lettre pour une entreprise avec numéro de contrat",
      fieldsets: standalone_page_fieldsets.concat([{
          legend: "Informations relatives à la banque",
          fields: [   { 'type': "text", 'id': "entreprise", 'label': "Entreprise de la personne faisant la procuration"},
                      { 'type': "text", 'id': "contrat", 'label': "Numéro de contrat"}]}])},
    free: {
      path: { category: "standalone", id: "free" },
      pagetitle: "Nouvelle lettre pour Free",
      fieldsets: standalone_page_fieldsets.concat([])},
    impots: {
      path: { category: "standalone", id: "impots" },
      pagetitle: "Nouvelle lettre pour les impôts",
      fieldsets: standalone_page_fieldsets.concat([{
              legend: "Informations relatives à la banque",
              fields: [
                  { 'type': "text", 'id': "impots", 'label': "Ville dont on dépend pour les impots"},
                  { 'type': "text", 'id': "fiscal", 'label': "Numéro fiscal"}]}])},
  };

  return forms;
})();