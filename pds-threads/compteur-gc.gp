#!/usr/bin/gnuplot

set title "Temps d'execution de compteur-gc en fonction de la taille du fichier et du nombre de thread"
set output 'compteur-gc.png'
set term png size 1024,768
set logscale x
set dgrid3d 30,30
set pm3d
splot 'compteur-gc.dat' using 1:2:3 with lines
