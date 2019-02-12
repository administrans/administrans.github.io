*site-transadministratif* permet de générer des fichiers PDF à partir d'un formulaire Django en utilisant [django-tex](https://pypi.org/project/django-tex/).

| Auteur                 | Licence     |
|------------------------|-------------|
| Maria Climent-Pommeret | Licence MIT |


Comment cela fonctionne
-----------------------

Pour l'instant, sont gérées :
- les lettres polies de demande de changement de prénom et de civilité
- les lettres de relance en cas d'absence de réponse (satisfaisante)

Les différents modes :
- par procuration (génère une procuration + la lettre de demande à faire envoyer
par un.e cis de l'entourage qui pourra gérer les tracas administratifs, pour pas
que vous ayez a gérer vous même cette merde)
- [to come] les lettres si vous souhaitez le faire vous même.

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

Si changement de mention de sexe à l'État-Civil (pas encore pris en charge) :
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


Contribuer ?
------------

OUI SVP ! Comme je peux pas ouvrir à tout va le gitlab, envoyez-moi un mail (avec un sujet explicite) at maria AT climent-pommeret DOT red, je vous créerais un compte !

Ont contribué
-------------

Un grand merci à toutes ces personnes qui ont fait des tests, bugs reports, merge requests, corrections orthographiques et montré du soutien \o/ :

- [Alice Climent-Pommeret](https://alice.climent-pommeret.red/fr)
