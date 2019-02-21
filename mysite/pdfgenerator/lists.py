pages = [
    {'id': 'cpam', 'title': 'CPAM',
        'description': 'Pour tout ce qui a trait à la CPAM'},
    {'id': 'banque', 'title': 'Banque',
        'description': 'Pour tout ce qui a trait à la Banque'},
    {'id': 'ecole', 'title': 'École/Université',
        'description': 'Pour tout ce qui a trait aux services scolarité d\'une École'},
    {'id': 'free', 'title': 'Free',
        'description': 'Pour tout ce qui a trait au service client de Free'},
    {'id': 'entreprise', 'title': 'Entreprise avec un numéro de contrat',
        'description': 'Pour tout ce qui a trait à une entreprise dont on dispose un numéro de contrat'},
    {'id': 'impots', 'title': 'Impôts',
        'description': 'Pour tout ce qui a trait au SIP'}
]

LISTS = {
    'procuration': {
        'title': 'Courriers par procuration',
        'pages': pages
    },
    'procuration_relance': {
        'title': 'Courriers de relance par procuration',
        'pages': pages
    },
    'standalone': {
        'title': 'Courriers sans procuration',
        'pages': pages
    }
}
