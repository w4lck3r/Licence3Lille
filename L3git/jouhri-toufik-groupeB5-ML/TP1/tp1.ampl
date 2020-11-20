set PROD;#ensemble des produits(fini)

param heures_ouvrees >= 0;

param vitesse_production {PROD} >= 0; # vitesse de production pour chaque produit // unités de produit par hours

param prix_vente {PROD} >= 0; #prix de vente pour chaque produit

param vente_max {PROD} >= 0; #nombre d'unités maximal que l'on peut vendre par produit

#variables du problemes

var qte_produite {p in PROD} >= 0, <= vente_max [p]; # variable de production pour chacun des produits

#on demande que pour chaque produit la quantité produite soit :
# 1- prositive
# 2- inférieure à la capacité que l'on a de vendre ce produit sur le marché.

#Contrainte du problemes

subject to production_limitee :
sum {p in PROD}
(qte_produite [p] / vitesse_production [p]) <= heures_ouvrees; 

#quantité_produite [p] / vitesse_production[p] est le nombre d'heure qui faut pour produire
#somme : sum (p in prod)(qte_produite[p]) represente le temps de production de l'usine
#ainsi cette contrainte signifie que le temps de production de l'usine est inférieure au nombre d'heures ouvrées


#la fonction à optimiser

maximize profit :sum {p in PROD} qte_produite [p] * prix_vente [p];

