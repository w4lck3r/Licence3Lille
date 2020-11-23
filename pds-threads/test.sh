#!/bin/bash


ALEAZARD=./aleazard

COMPTEUR=./compteur-gc
RAPIDE="./tri-rapide -Tn"

RES_ALEAZARD=res_aleazard.txt

COMPTEUR_GC_TEMPS=compteur-gc.dat
TRI_RAPIDE_TEMPS=tri_rapide.dat



touch $COMPTEUR_GC_TEMPS
touch $TRI_RAPIDE_TEMPS

	for power_taille in `seq 2 10`; do
		let "TAILLE_FICHIER_ALEAZARD= 10**$power_taille"
		$ALEAZARD $TAILLE_FICHIER_ALEAZARD > $RES_ALEAZARD
		for power_thread in `seq 0 5`; do
			let "NOMBRE_THREAD= 2**$power_thread"
			$COMPTEUR $RES_ALEAZARD $NOMBRE_THREAD>>$COMPTEUR_GC_TEMPS
		done
	done

rm -f $RES_ALEAZARD


for power_taille in `seq 2 7`; do
	let "TAILLE_FICHIER_RAPIDE= 2**$power_taille"
	for power_thread in `seq 0 5`; do
		let "NOMBRE_THREAD= 2**$power_thread"
		dd if=/dev/urandom of=/tmp/alea bs=1048576 count=$TAILLE_FICHIER_RAPIDE
		$RAPIDE $NOMBRE_THREAD /tmp/alea >>$TRI_RAPIDE_TEMPS
	done
done






#EOF
