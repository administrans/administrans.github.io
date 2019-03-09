import pytest
from django import http
from pdfgenerator import lists
from pdfgenerator import views
from django.utils import html


def test_list_view():
    request = object()
    response = views.list(request, 'procuration')
    list = lists.LISTS['procuration']

    assert response.status_code == 200

    content = response.content.decode()
    assert '<h1>{}</h1>'.format(html.escape(list['title'])) in content

    for form in list['forms']:
        assert '<p>{}</p>'.format(html.escape(form['description'])) in content


def test_list_view_unkwnown():
    request = object()
    with pytest.raises(http.Http404):
        response = views.list(request, 'unkwown')
