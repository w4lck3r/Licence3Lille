# Jouhri toufik & Yassine Jarrir


- on test sur un fichier de 250Mo généré en lançant la commande `make test` qui peut prendre plusieurs minutes.
- il faut initialiser au préalable une variable d'environnement `$MCAT_BUFSIZ` avant d'utiliser `./mcat`
- On remarque qu'on traitant plusieurs fichiers de différentes tailles,la taille du buffer optimale tends vers  4096 octets.

## récupérer le projet

`git@gitlab-etu.fil.univ-lille1.fr:jouhri/pds-fs.git`

## compilation
 
 `make mcat`

## compilation et execution de script
 
` make test `

## Les fichiers créés sont effacés avec la commande:

 `make clean`.

## créer le graphique

Après l'exécution du test, on utilise `gnuplot` qui va lire les données
dans le fichier `mcat.dat`  après l'exécution de `test.sh`.
Le graphique sera dans `mcat.png`.

` gnuplot mcat.gp `


## exécution de `mcat` :


`./mcat-scd <fichier>`

graph
![Graph](mcat.png)

# Partie 1

À chaque appels système avec un buffer de plus grande taille le temps d'execution de cet appel est réduit
jusqu'à atteindre à un moment donné *epsilon* (valeur rapprochée de 0)
Car pour un buffer de 1 octet le nombre d'appel système est de 8 millions si on a un fichier de 8 MO,
Alors dans mon code on augmente de 2 octets la taille du buffer à chaque itération ce qui provoque
la reduction du temps d'execution des appels systèmes.

# Partie 2

L'utilisation des fonction fgetc et fputc améliore grandement la rapidité des appels système,puisque l'execution est instantané.
Ce qui implique que dans notre cas d'etude le buffer fournit par défaut devrait être supérieur à 10485760 (10^6)
