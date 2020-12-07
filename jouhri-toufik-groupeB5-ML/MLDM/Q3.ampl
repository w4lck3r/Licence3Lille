reset ;
#-----------------------------SETS-------------------------------------------
# ensemble pour les magasins A,B,C
set MAGASINS;

# on crée un ensemble pour les produits
set PRODUITS;
#-----------------------------PARAMS----------------------------------------
# Magasins
param nb_magasins >=0;

# poids et volume max du vélo
param poids_velo >=0;
param volume_velo >=0;

# on crée un paramètre qui définie la quantité des produits du samedi soir
param qte_samedi{MAGASINS,PRODUITS} >=0;

# on crée un paramètre qui définie la quantité minimal des produits
param qte_min{MAGASINS,PRODUITS} >= 0;

# on crée un paramètre qui définie le poids
param poids{PRODUITS} >= 0;

# on crée un paramètre qui définie le volume
param volume{PRODUITS} >= 0 ;

# on crée un paramètre booléene qui renvoie 0 ou 1 pour la fragilité des produits
param fragile{PRODUITS} binary ;
#----------------------------VARS--------------------------------------------*/
#une valeur qui définie la quantité dont on a besoin pour transporter
var qte_chargee{MAGASINS,PRODUITS} integer >= 0 ;

# La quantité à l'instant
var qte_a_l_instant{MAGASINS,PRODUITS} integer >= 0 ;

# le poids chargé
var poids_charge{PRODUITS} >=0 ;

#la quantité déchargée
var qte_dechargee{MAGASINS,PRODUITS} integer>=0 ;


# le poids déchargé
var poids_decharge{MAGASINS} <= poids_velo ;

# volume decharge
var volume_decharge{MAGASINS} <= volume_velo ;
#----------------------------------------------------------------------------
minimize poids_total :
    sum {m in MAGASINS,p in PRODUITS} (qte_chargee[m,p]*poids[p] + qte_dechargee[m,p]*poids[p]) ;


subject to qte_a_l_instant_mag {m in MAGASINS,p in PRODUITS}:
    qte_a_l_instant[m,p] = if m = 1 then
                              qte_samedi[1,p] + qte_dechargee[nb_magasins,p] - qte_chargee[1,p]
                           else
                              qte_samedi[m,p] + qte_dechargee[m-1,p] - qte_chargee[m,p] ;

subject to quantite_chargee_et_dechargee {m in MAGASINS,p in PRODUITS}:
      qte_chargee[m,p] = if m = 1 then
                            qte_dechargee[nb_magasins,p]
                         else
                            qte_dechargee[m-1,p];

subject to transfert_magasins{m in MAGASINS ,p in PRODUITS}:
      qte_dechargee [m,p]= if m = nb_magasins then
                              if qte_min[1,p] < qte_samedi[1 ,p] then
                                      0
                              else
                                  qte_min[1,p] - qte_samedi[1 ,p] + qte_dechargee[1 ,p]
                            else
                              if qte_min[m+1,p] < qte_samedi[m+1 ,p] then
                                      0
                              else
                                    qte_min[m+1 ,p] - qte_samedi[m+1 ,p]+ qte_dechargee[m+1 ,p];

subject to poids_velo_max {m in MAGASINS}:
      poids_decharge[m] = sum {p in PRODUITS} qte_dechargee[m,p]*poids[p];


subject to volume_velo_max {m in MAGASINS}:
        volume_decharge[m] = sum {p in PRODUITS} qte_dechargee[m,p]*volume[p];

subject to qte_fragile_max {m in MAGASINS} :
        sum {p in PRODUITS} fragile[p]*qte_dechargee[m,p] <= 0.55*volume_decharge[m];

/*----------------------------------------------------------------------------*/
data;

set MAGASINS := 1 2 3 ;
set PRODUITS := maroilles lait beurre carottes navets ;
param nb_magasins := 3;
param poids_velo := 25;
param volume_velo := 100;

param      qte_samedi   :
         maroilles  lait   beurre     carottes   navets :=
1          5          9       5        10         18
2          10         15      7        20         16
3          25         13      15       50         15
;

param    qte_min :
        maroilles  lait   beurre     carottes   navets :=
1         15       10       12         25         13
2         11       12        8         25         16
3         14        8        7         25         18
;


param :     poids            volume    fragile :=
maroilles     0.5              0.2        0
lait          1                1          1
beurre        0.25             0.1        1
carottes      1                0.8        0
navets        1                0.7        0
;
