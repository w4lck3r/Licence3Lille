Réponses pour les questions sur TP1 :

--Q4:
Le fichier first_samples/image_ex1.html affiche les valeurs (r,v,b,a) pour le pixel (50, 50).
Les valeurs affichées en chargeant le fichier sont (0,0,0,0) car l'image n'est pas encore prête et le script est exécuté avant le chargement de l'image.

--Q5:
Le fichier first_samples/image_ex1_v2.html nous affiche les valeurs correctes (r,v,b,a) pour le pixel (50, 50) car on a chargé le script après le chargement de l'image.

--Q6:
En exécutant first_samples/image_ex2.html, il n'y aura que l'affichage de l'image,le fichier tente de changer le coin supérieur gauche de l'image et transformer celà en gris, mais il y a 2 problemes(la transformation se passe avant de le chargement de l'image,nous faisons les modifications sur un canvas temporaire et local et donc il y aura pas de résultat).

--Q7:
Maintenant le changement (q6) fonctionne dans le fichier first_samples/image_ex2_v2.html car on a exécuté le code après que l'image soit prête et on a rendu visible notre canvas.

--Q8:
Dans le fichier first_samples/video_ex1.html, nous essayons de transformer une partie du cadre de la vidéo en gris mais ça ne fonctionne pas car la transformation se passe avant le chargement de la vidéo et la transformation était faite pour un frame seulement.

--Q9:
Maintenant qu'on a chargé la vidéo avant dans le fichier first_samples/video_ex1_v2.html , tout fonctionne bien et on a pu changé ce cadre en gris mais qu'un frame.

--Q10:
Dans ce fichier first_samples/video_ex1_v3.html on a pu corriger les deux problèmes de la question 8 et donc on peut transformer une partie du cadre de toute la vidéo en gris.

--Q11:
Le test de la fonction demandée est utilisé dans processing_samples/image_get_pixel.html.

--Q12:
Le test de la fonction demandée est utilisé dans processing_samples/image_video.html.

--Q13:
<<<<<<< HEAD
Question faite : regarder samples/tp1Q13.html
et features/plan.js

--Q14:
Question faite : voir processing_samples/video_bandw.html

--Q15:
Question faite :  voir processing_samples/TP1_Q15.html

--Q16: 
=======
Pas faite

--Q14:
>>>>>>> b906e9129f4ea49935f7d6e029c876382e8fc9c7
