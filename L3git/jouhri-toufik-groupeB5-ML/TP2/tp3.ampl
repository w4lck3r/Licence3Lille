set MEDIA; #ensemble des medias envisagé par la compagne

param cout{MEDIA} >=0;
param audience{MEDIA} >=0;
param valeur_min{MEDIA} >=0;
param personnel =100;
param publicitaire{MEDIA} >= 0;
var qte {m in MEDIA} >= valeur_min[m];
subject to budget_limite:

sum {min:MEDIA} cout[m]*qte[m]<= budget_limite;
subject to personnel_limite: 
sum{min:MEDIA} publicitaire[m]*qte[m]<=personnel;
sum {min:MEDIA} audience[m]*qte[m];

maximize public:

data;
