# Rapport pour le TP3

# TP réalisé par Jouhri Toufik & Jarir Yassine

## 1) 
 - la connexion entre le client et le serveur est établie si
	le port 2020 soit ouvert et que le serveur soit toujours à l’écoute et que 
	le client fait une requête de connexion sur le serveur.
	Cette requête se fait en 3 étapes. Le client transmet
	un segment pour commencer, ensuite le serveur reçoit ce segment
	et lui envoie un accusé de réception ,enfin le client transmet au
	serveur un accusé de réception.