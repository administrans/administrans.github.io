import datetime

import pytest

from django_tex.core import compile_template_to_pdf


@pytest.mark.parametrize('form_id, data', [
    ('procuration_banque', {
        'procurantfirstname': 'Alice',
        'procurantlastname': 'Test',
        'procurantlistofname': 'Luc',
        'procuranttelephone': '+33621347094',
        'procurantdob': datetime.date(1908, 1, 7),
        'procurantpob': 'Lille (Nord)',
        'procurantaddress1': '78',
        'procurantaddress2': '13001 Marseille',
        'procurantlocation': 'Poitiers',
        'procurantemail': 'test@test.com',
        'procurantgender': '0',
        'procurantdeadname': 'Test',
        'debutprocuration': datetime.date(1908, 1, 1),
        'finprocuration': datetime.date(2019, 1, 1),
        'personfirstname': 'Olive',
        'personlastname': 'Ettom',
        'personlistofname': 'Ilsferont',
        'persondob': datetime.date(1900, 8, 1),
        'personpob': 'Nantes(Loire-Atlantique)',
        'persontelephone': '+33621347067',
        'personlocation': 'Poitiers',
        'personemail': 'receveur@test.com',
        'personaddress1': 'test receveur',
        'personaddress2': '75000 Paris',
        'persongender': '0',
        'procurantbanque': 'LCL',
    })
])
def test_tex_templates(form_id, data):
    assert compile_template_to_pdf('pdfgenerator/latex/{}.tex'.format(form_id), {'cleaned_data': data})
