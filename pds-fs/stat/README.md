#   Afficher les métadonnées d’un i-nœud

Ce répertoire correspond aux exercices de la section
[Afficher les métadonnées d’un i-nœud](https://www.fil.univ-lille1.fr/~hym/e/pds/tp/tdfs1-cmd.html#stat).
- pour respecter le principe de la programmation modulaire,vue qu'on a un makefile, le fichier contient :  
                    -main.c
                    -stat.c
                    -stat.h
                    -makefile
                    -test.txt
-pour lancer le code : ./main.out "nom_du_fichier".txt
->Le code est commenté
///////
Exo6 : 
/******************************************************************************/
aprés avoir lancé man 2 stat , on obtient la description de la commande ainsi
que tout les prérequis pour la lancé ( include"sys/stat.h") et sa structure
struct stat {
               dev_t     st_dev;         /* ID of device containing file */
               ino_t     st_ino;         /* Inode number */
               mode_t    st_mode;        /* File type and mode */
               nlink_t   st_nlink;       /* Number of hard links */
               uid_t     st_uid;         /* User ID of owner */
               gid_t     st_gid;         /* Group ID of owner */
               dev_t     st_rdev;        /* Device ID (if special file) */
               off_t     st_size;        /* Total size, in bytes */
               blksize_t st_blksize;     /* Block size for filesystem I/O */
               blkcnt_t  st_blocks;      /* Number of 512B blocks allocated */

               /* Since Linux 2.6, the kernel supports nanosecond
                  precision for the following timestamp fields.
                  For the details before Linux 2.6, see NOTES. */

               struct timespec st_atim;  /* Time of last access */
               struct timespec st_mtim;  /* Time of last modification */
               struct timespec st_ctim;  /* Time of last status change */

           #define st_atime st_atim.tv_sec      /* Backward compatibility */
           #define st_mtime st_mtim.tv_sec
           #define st_ctime st_ctim.tv_sec
           };
/********************************************************************************/
Exo 7
/***/
->l'appel systeme qui permet à la commande stat d’obtenir les métadonnées
est int stat(const char *path, struct stat *buf); 
le type en c est un : int , récupère l'état du fichier pointé par path et remplit le tampon buf. 

-> exemple :    struct stat sb; 
                stat(argv[1],&sb);
->Blocs représente le nombre de blocs utilisés pour stocker le fichier en octets
-> IO Blocks : représente la taille maximal de chaque block : 4092 octets

/******/ 
Exo 8
/***/

Afin que le nombre des blocks augmente, nous allons ajouter du texte dans notre fichier. On remarque que le nombre des blocks augmente de 8 lorsque la taille du fichier dépasse 4096, car le minimum qu'on peut allouer à un fichier est 8 blocks de taille 512 bytes meme si on écrit un seul caractére.

/****/
Exo9
/***/
Les liens permettent d’accéder à un même IO Node par plusieurs chemins différents. Il existe deux types de liens: les liens physiques et les liens symboliques. Lorsqu’un lien physique est mis en place ou supprimé, le nombre associé au champ «link» de la commande stat augmentera ou diminuera.Pour prouver cela, nous allons donc crée un lien physique et un lien symbolique pointant sur le fichier test. Enfin, nous mettrons en place une copie du fichier test.

/*****/
Exo10
/**/
On exécute ensuite la commande stat sur le fichier, sur sa copie, et sur ses deux liens physique et symbolique. On constate que pour le champ «Liens» ,Lorsqu’un lien physique est mis en place, le nombre associé au champ «link» de la commande stat augmente. Cependant, ceci n’est pas valable pour les liens symbolique et la copie.Le lien physique est une route en plus, il pointe sur le même fichier c’est pour cette raison qu’il ont la même valeur du iNode , alors que le lien symbolique est fichier qui pointe vers un autre, pour cette raison le lien et le fichier test n’ont pas la même valeur du inode et aussi une taille réduite.Si on supprime le fichier test le lien physique reste accessible, la copie aussi car ce sont deux fichier distinct mais le lien symbolique ne sera plus accesible lorsqu’on supprime la cible.
/****/
Exo11 / Exo12 / Exo13
/***/
-> Voir le code.

difficultée trouvé : la partie timeZone définie comme ça :
long int tm_gmtoff;		/* Seconds east of UTC.  */
j'ai pas trés bien compris, car en comparant avec le output de stat,on dirait que +0200 est en heure alors que le champs tm_gmtoff contient une valeur en seconde en UTC. et puis dans la structure _time_t il n'ya pas moyen pour avoir la différence avec GMT.

 Copyright © 2020 "Toufik Jouhri" <toufik.jouhri.etu@univ-lille.fr>
                  "Yassine Jarir" <yassine.jarir.etu@univ-lille.fr> 