set logscale x
set output 'mcat.png'
set xlabel "taille du buffer (byte)"
set ylabel "temps en secondes"
set style data linespoints
plot "mcat.dat" using 1:2 title "real", \
     "mcat.dat" using 1:3 title "user", \
     "mcat.dat" using 1:4 title "sys",

pause -1 "Hit return to cotinue"
