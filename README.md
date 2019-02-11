*site-transadministratif* permet de générer des fichiers PDF à partir d'un formulaire Django en utilisant [django-tex](https://pypi.org/project/django-tex/).

| Auteur                 | Licence     |
|------------------------|-------------|
| Maria Climent-Pommeret | Licence MIT |


Checklist des papiers à changer
-------------------------------

Si changement de prénom à l'EC
- carte de transport
- CNI/passeport
- permis de conduire
- impôts
- médecins
- mutuelle
- carte de groupe sanguin/donneur.se d'organes
- MDPH
- électricité/gaz/eau
- opérateur téléphonique/Internet
- carte d'électeur.rice

Si changement de mention de sexe à l'État-Civil :
- CNI/passeport
- permis de conduire
- numéro INSEE
- numéro de sécurité sociale

Requirements
------------

- Python>=3.7
- django-tex
- jinja2-django-tags
- texlive-full (pour la génération du PDF à partir de .tex)


Déploiement
-----------

[Regardez ici par exemple](https://maria.climent-pommeret.red/fr/blog/deploying-a-django-application/)

