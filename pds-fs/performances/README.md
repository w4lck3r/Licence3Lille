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
