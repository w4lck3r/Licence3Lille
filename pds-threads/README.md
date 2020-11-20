#   Processus légers

Ce dépôt correspond aux TP de PDS sur le thème
« [Processus légers](https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1.html) ».


##  Instructions pour rendre votre travail avec gitlab

Pour permettre à votre chargé de TD de suivre votre travail sur ce projet :

-   *forkez* ce dépôt (bouton _Fork_),
-   dans le dépôt *forké*, ajoutez votre chargé de TD aux membres du
    projet avec l’accès _Developer_,
-   éditez ce fichier  pour indiquez vos noms (membres du
    binôme) et supprimer ce paragraphe d’instructions.


##  Contenu initial du dépôt

Ce répertoire contient deux squelettes de code.


### Calcul du taux de G / C

Il s’agit de l’exercice pour calculer le [taux de G/C].

[taux de G/C]: https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1-concrets.html#taux-gc

`compteur-gc.c`
:   base pour le compteur de bases G et C

`aleazard.c`
:   générateur d’un « génome » aléatoire


#### Travail à faire

L’objectif est de mettre en place la version _multithread_ du calcul
du taux G/C.


### Rendez-vous

Il s’agit de l’exercice [Rendez-vous].

[Rendez-vous]: https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdth1-003.html#sec4

`rdv.c`
:   code initial pour l’exercice du rendez-vous


#### Travail à faire

Les objectifs sont, successivement, de :

-   compléter la version à processus légers,
-   faire une variante, `rdv3.c`, à 3 processus légers,
-   faire une variante généralisée, `rdvn.c`, avec un nombre
    arbitraire de processus légers (vous ajouterez une constante
    `#define N` qui sera le nombre de processus légers à déclencher et
    vous changerez la fonction déclenchée dans les _threads_ pour
    qu’elle prenne en argument le numéro du processus légers, sur le
    modèle des fonctions `a` et `b`).
