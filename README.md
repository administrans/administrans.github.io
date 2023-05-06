Administrans
===

https://trans-cec.github.io/

URL IPFS: voir le lien dans l'encart "About" / "À propos de" sur [GitHub](https://github.com/administrans/administrans.github.io).

Administrans est un outil en ligne permettant de générer des fichiers pdf pour faire des attestations pour les changements de prénoms ainsi que des lettres pour demander les changements suite à un changement de prénom/mention genre.
Il a pour but de faciliter les démarches administratives des personnes transgenre en France.

Cette version fonctionne 100% côté client et ne nécessite pas de serveur. Elle est basée sur https://administrans.fr/ (https://github.com/entropyqueen/trans-cec/)

Administrans, anciennement *trans-cec* permet de générer des fichiers PDF à partir d'un formulaire en utilisant [texlive.js](https://github.com/fzimmermann89/texlive.js/) (ou[django-tex](https://pypi.org/project/django-tex/) pour [la version avec serveur](https://github.com/entropyqueen/trans-cec)).
Il s'agit d'un fork du project d'Emy Canton, lui-même un fork du projet Maria Climent-Pommeret.

| Auteur.ice             | Licence     |
|------------------------|-------------|
| Maria Climent-Pommeret | Licence MIT |


| Mainteneur.euse(s) | Tâche(s)                   | Contact |
|--------------------|----------------------------|---------|
| Suzanne Soy        | accepte les MR, c'est tout | [github](https://github.com/administrans/administrans/issues)    |
| Emy Canton         | version avec serveur       | [github](https://github.com/entropyqueen/trans-cec/issues)    |

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
- Carte de transport
- CNI/passeport
- Permis de conduire
- Impôts
- Médecins
- Mutuelle
- Carte de groupe sanguin/donneur.se d'organes
- MDPH
- Électricité/gaz/eau
- Opérateur téléphonique/Internet
- Carte d'électeur.rice
- Livret de famille

Si changement de mention de sexe à l'État-Civil (pas encore pris en charge) :
- CNI/passeport
- Permis de conduire
- Numéro INSEE
- Numéro de sécurité sociale
- Livret de famille

Dépendances
-----------

Pour la version sans serveur, il n'y a aucune dépendance.

Voir https://github.com/entropyqueen/trans-cec pour la version avec serveur.

Déploiement
-----------

Vous pouvez copier-coller l'ensmble des fichiers sur n'importe quel serveur web et avoir un miroir du site (HTTPs et non pas HTTP, de préférence).

En général, rien à configurer, rien à lancer.

Dans le rare cas où vous changez [les paquets LaTeX supplémentaires](https://github.com/administrans/trans-cec.github.io/tree/main/extra-packages) ou [l'icône de favoris](https://github.com/administrans/trans-cec.github.io/blob/main/favicon.png), alors lancez `./deploy.sh` (ce script génère un `.ico` 16x16 à partir du `favicon.png`, puis extrait `extra-packages/*.zip` dans `texlive.js/texlive/texmf-dist/` et régénère `texlive.lst` et les fichiers listes `ls-R`, pensez à faire un `git commit` dans ce *submodule*)

Miroirs IPFS
------------

Le protocole [IPFS](https://ipfs.tech) permet à plusieurs personnes d'héberger un miroir de manière non-hiérarchique et distribuée. Si vous aimez partager et n'aimez pas la hiérarchie, vous pouvez lancer la commande suivante pour avoir l'addresse de hachage de ce site, ou bien juste regarder le lien "Homepage" / "Page d'accueil" dans la section "About" / "À propos de" de [GitHub](https://github.com/administrans/administrans.github.io), le lien est déjà là.

```shell
ipfs add --recursive --progress --hidden --ignore-rules-path=.ipfsignore --quieter .

# Remplacez Qm...BlaBla par le code obtenu ci-dessus
ipfs cid base32 Qm...BlaBla
```

Pour héberger un miroir IPFS, vous pouvez naviguer sur l'adresse IPFS et cliquer sur [icône IPFS] → [Import to Files on My Node], [si votre navigateur le supporte](https://docs.ipfs.tech/install/ipfs-companion/). Ou bien, dans votre ligne de commande, tapez:

```shell
# Remplacez bafy...blabla par le code obtenu ci-dessus
# ou par le code dans l'adresse dans l'encart sur GitHub
ipfs pin add --progress bafy...blabla
```

Contribuer ?
------------

OUI SVP ! Pour cela, n'hésitez pas à faire des issues github ou bien ouvrir directement des PR sur github 

Pour cela les dépendances système requises sont :

- de la bonne volonté

Vouz pouvez travailler sur votre machine en utilisant `git` et votre éditeur favori, ou bien utiliser les [codespaces](https://docs.github.com/en/codespaces) pour éditer directement depuis votre compte GitHub, *sans rien installer*.

Ont contribué
-------------

Un grand merci à toutes ces personnes qui ont fait des tests, bugs reports, merge requests, corrections orthographiques
et montré du soutien \o/ :

- [Emy Canton](https://entropyqueen.github.io/)
- [Alice Climent-Pommeret](https://alice.climent-pommeret.red/fr)
- [Sasha Emily Chelsea Murgia](https://www.chelsea486mhz.fr)
- Aurore Moisy-Mabille
- Agate Berriot
- Une autre [Alice](https://bidule.menf.in/users/alice)
- [Freyja Wildes](https://social.art-software.fr/@freyja_wildes)
- [Suzanne Soy](https://suzanne.soy)
- Misc

