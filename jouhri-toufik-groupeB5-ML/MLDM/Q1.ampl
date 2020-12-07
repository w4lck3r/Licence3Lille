reset;
#-----------
# ensemble pour les magasins A,B,C ( 1 2 3 )et produits
set PROD;

set MAGASINS;

#---------


param poids_velo >=0; #poids et volume maximal du velo

param volume_velo >=0;

param stock_samedi{MAGASINS,PROD} >=0;#parametre de la quantitée des produits du samedi soir

param stock_min{MAGASINS,PROD} >= 0;#paramètre de la quantité minimale des produits

param poid_unitaire{PROD} >= 0;# un paramètre qui définie le poids unitaire

param volume_unitaire{PROD} >= 0;# un paramètre qui définie le volume unitaire

#-------------

var qte_chargee{MAGASINS,PROD}  >= 0; #variable pour la quantitée chargé dans un magasin

var qte_dechargee{MAGASINS,PROD} >=0; #la quantitée déchargée

var qte_magasin{MAGASINS,PROD} >= 0; # La quantité disponible au magasin


var volume_charge_decharge{MAGASINS} <= volume_velo; #volume chargé et dechargé ( total )


minimize poids_total:
    sum {i in MAGASINS,p in PROD} ( qte_chargee[i,p]*poid_unitaire[p] + qte_dechargee[i,p]*poid_unitaire[p] );


subject to organise_magasin {i in MAGASINS,p in PROD}:

		qte_magasin[i,p]= if (stock_samedi[i,p] < poids_velo) then
								if(stock_samedi[i,p] < stock_min[i,p]) then			
									qte_dechargee[i,p] = 0
									qte_chargee[i,p] = stock_samedi[i,p]
								else
									qte_dechargee [i,p] = qte_chargé[i-1,p] + stock_samedi[i,p]
									qte_chargé [i,p] = 0
						  else 
								if (stock_samedi[i,p] > stock_min[i,p]) then
									qte_dechargee[i,p] = 0
									qte_chargé[i,p]= stock_samedi[i,p]- stock_min[i,p]
								else 
									qte_dechargee[i,p]= qte_chargé[i-1,p] + stock_samedi[i,p]
									qte chargé[i,p] = 0;

subject to poids_velo_max {i in MAGASINS,p in PROD}:
      poids_charge_decharge[i,p] = qte_dechargee[i,p]*poid_unitaire[p] + qte_chargee[i,p]*poid_unitaire[p];


subject to volume_velo_max {i in MAGASINS,p in PROD}:
        volume_charge_decharge[i] =  qte_dechargee[i,p]*volume_unitaire[p] + qte_chargee[i,p]*volume_unitaire[p];


#------------------------data-------------------------------------

data;
set PROD := carotte;

param poids_velo := 35;
param volume_velo := 100;

param  	 fragile poid_unitaire volume_unitaire :=
carottes  0			1 			0.8;

set MAGASINS := A B C;

param stock_samedi 
			   carotte := 
A              10
B              20
C              50;

param stock_min
			  carotte :=
A        		25
B				25
C 				25;