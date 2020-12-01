#include "stat.h"

void displayTime(struct stat sb){
    /*
    Declaration des variables
    */
    struct tm * accessTime,* modifyTime,* changeTime;   
    struct tm * DiffTimeAccess,*DiffTimeModify,*DiffTimeChange;
    char access[100],modify[100],change[100];
    /*
    questa parte è stata estenuante
    ------------------------------
      access Time parse part 
      ---------------------
      on recupere l'heure locale d'accés au fichier
      puis on la formate avec strftime pour remplir 
      le tableau access[100] en format YY-mm-dd HH:MM:SS
      et pareil pour les autres parts.
    */
    accessTime = localtime(&(sb.st_atime));
    DiffTimeAccess = localtime(&(sb.st_atime));
    strftime(access,100,"%Y-%m-%d %H:%M:%S",accessTime);
    /*
    modify time parse part
    */
    modifyTime= localtime(&(sb.st_mtime));
    DiffTimeModify = localtime(&(sb.st_mtime));
    strftime(modify,100,"%Y-%m-%d %H:%M:%S",modifyTime);
    /*
    Change Time parse part
    */
    changeTime= localtime(&(sb.st_ctime));
    DiffTimeChange = localtime(&(sb.st_ctime));
    strftime(change,100,"%Y-%m-%d %H:%M:%S",changeTime);
    /*
    this is a painful printf
    */
    printf ("Access: %s.%ld +0%ld00\nModify: %s.%ld +0%ld00\nChange: %s.%ld +0%ld00\n",
    access,sb.st_atim.tv_nsec,DiffTimeAccess->tm_gmtoff/3600,
    modify,sb.st_mtim.tv_nsec,DiffTimeModify->tm_gmtoff/3600,
    change,sb.st_ctim.tv_nsec,DiffTimeChange->tm_gmtoff/3600);
}
void displayStat(struct stat sb,char * fileName){
  /*
  Declaration des variables
  */
  int statchmod;
  register struct passwd *pw;
  register struct group *grp;
  register uid_t uid = geteuid();
  register gid_t gid = getegid();
  /*
  getpwuid():
  La fonction getpwuid() renvoie un pointeur sur une structure 
  contenant les divers champs de l'enregistrement 
  de la base de données des mots de passe correspondant 
  à l'ID utilisateur uid. 
  */
  pw = getpwuid (uid);
  /*
  renvoient la struc­ture  de  groupe, 
  ou NULL s'il n'y a pas de groupe 
  corre­spondant aux données, ou si une erreur se produit.
  */
  grp = getgrgid(gid);
  /*
  affichage de mode : cryptée contient tout les infos sur le fichier
  affichage du nom de fichier , sa taille ,blocks utilisés,taille des blocks
  en octects(4092 octets max)
  */
  printf(" Mode: %lo \n",(unsigned long) sb.st_mode);/*octal*/
  printf("  File: %s \n",fileName);
  printf("  Size: %lld ",(long long) sb.st_size);
  printf("\t\tBlocks: %lld",(long long) sb.st_blocks);
  printf("\tIO Block: %ld ",(long) sb.st_blksize);
  /*
  affiche le type du fichier
  (sb.st_mode & S_IFMT) dans le switch :
  & logique : bit à bit directement avec sb.st_mode (sb.st_mode & S_IFMT)
  signifie ne considére que les bits impliqués pour déterminerle type de 
  fichier (fichier normal, socket, bloc ou périphérique de caractères, etc.)
  mode_t st_mode est défini sur 4 octets (16 bits). 
  les 4 premier sont utilisés pour le type de fichier,
  tandis que les 12 autres sont utilisés pour le mode fichier 
  (où les 9 dernier de ces 12 sont utilisés pour l'autorisation de fichier)
  */
  switch (sb.st_mode & S_IFMT){ 
    case S_IFBLK:  printf("\tBloc-oriented-devic\n");      break;
    case S_IFDIR:  printf("\trepertory\n");                 break;
    case S_IFCHR:  printf("\tcharacter-oriented-device\n"); break;
    case S_IFIFO:  printf("\tFIFO/Pipe\n");                 break;
    case S_IFLNK:  printf("\tsymbolic link\n");             break;
    case S_IFREG:  printf("\tRegular file\n");              break;
    case S_IFSOCK: printf("\tsocket\n");                    break;
    default:       printf("\tunknown ?\n");                 break;
  }
  /*
  *Device: ID du périphérique contenant le fichier 
  INode : Une structure de données contenant 
          des informations à propos d'un fichier ou répertoire stocké
          sur le disque dur.
  Links:  Nombre de liens physiques .
    
  */
  printf("Device: %lxh/%ldd", sb.st_dev, sb.st_dev);                         
  printf("\tInode: %ld", (long) sb.st_ino);                     
  printf("\tLinks: %ld\n", (long) sb.st_nlink);
  statchmod = (sb.st_mode & (S_IRWXU | S_IRWXG | S_IRWXO));
  printf("Access: (%#o/",statchmod);
  /*
  User permissions
    r = read (lire)
    w = write (ecrire)
    x = execute (executer)
    - = nada (rien)
  */
  printf((sb.st_mode & S_IRUSR)? "r":"-");
  printf((sb.st_mode & S_IWUSR)? "w":"-");
  printf((sb.st_mode & S_IXUSR)? "x":"-");
  /*
  Group permissions
  */
  printf((sb.st_mode & S_IRGRP)? "r":"-");
  printf((sb.st_mode & S_IWGRP)? "w":"-");
  printf((sb.st_mode & S_IXGRP)? "x":"-");
  /*
  Other permissions
  */
  printf((sb.st_mode & S_IROTH)? "r":"-");
  printf((sb.st_mode & S_IWOTH)? "w":"-");
  printf((sb.st_mode & S_IXOTH)? "x":"-");
  printf(")");
  /*
  Affichage des Id Group & user en characteres
  le pointeur pw et grp pointe chacun sur les structures associés
  pour recuperer les valeurs des champs pw_name et gr_name
  */
  if(pw && grp){
    printf("\tUid: ( %ld/ %s)",(long)sb.st_uid,pw->pw_name);
    printf("\tGid: ( %ld/  %s)\n",(long)sb.st_gid,grp->gr_name);
  }
  else{
    fprintf(stderr,"erreur d'allocation\n");
    exit(EXIT_FAILURE);
  }
  /*
  appel de fonction displayTime(sb)
  afficher la date sous format : 
  YYYY-MM-DD hh:min:ss:ms +timezonediff 
  */
  displayTime(sb);  
  /*
  Birth: Reserved to show the original creation 
  date of the file,but this is not implemented in Linux.
  */
  printf(" Birth: -\n"); 
}




