# Rapport pour le TP2

## jouhri toufik et yassine jarir

## On définit un Programme Java qui contient deux classe : SendUdp et Receive UDP
- le Sender envoie un packet au reveiver via un port de poste à poste ou dans mon cas j'ai testé
avec le localhost 127.0.0.1


à l'aide des commandes suivantes par exemple: 
dans le dossier src/rsx on ouvre le premier terminal on lance :

 - `java ReceiveUDP.java 1500`

 puis dans un deuxieme terminal on lance la commande dans src/rsx: 
 
 - `java SendUDP.java 127.0.0.1 1500 "you are welcome"`
