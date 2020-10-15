# Rapport pour le TP2

## jouhri toufik et yassine jarir

## On définit un Programme Java qui contient deux classe : SendUdp et Receive UDP
- le Sender envoie un packet au reveiver via un port de poste à poste ou dans mon cas j'ai testé
avec le localhost 127.0.0.1


à l'aide des commandes suivantes par exemple: 

javac rsx/*.java -d ../classes
jar cvfm ../rsx.jar ../manifest-sc rsx
java -jar rsx.jar

sinon 

 - `java ReceiveUDP 1500 `
 - `java SendUDP 127.0.0.1 1500 "you are welcome" `
 ou entrer les arguments manuellement dans un IDE 