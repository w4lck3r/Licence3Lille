#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <assert.h>
#include <pthread.h>


typedef struct compteur_s{
    char* bloc;
    unsigned long taille;
  } compteur_s;

void usage()
{
  printf("Utilisation de compteur_gc\n\n");
  printf("-h : affiche l'aide au programme\n");
  printf("-v : Active le mode bavard (détails supplémentaires)\n");
  printf("\n Exemples :\n");
  printf("./compteur_gc [nom_fichier] [nombre_thread] \n");
  printf("./compteur_gc -v [nom_fichier]\n\n");
}

unsigned long compteur_gc(char *bloc, unsigned long taille) {
    unsigned long i, cptr = 0;

    for (i = 0; i < taille; i++)
        if (bloc[i] == 'G' || bloc[i] == 'C')
            cptr++;

    return cptr;
}

void* mt_compteur_gc (void * arg)
{
  unsigned long res;
  compteur_s* c_s = (compteur_s*) malloc (sizeof(compteur_s));
  c_s = (compteur_s*) arg;
  res = compteur_gc(c_s->bloc,c_s->taille);
  return (void *) res;

}




int main(int argc, char *argv[]) {
    struct stat st;
    int fd;
    char *tampon;
    int lus;
    unsigned long cptr = 0;
    unsigned long cptr_multithread = 0;
    off_t taille = 0;
    struct timespec debut, fin;
    int i = 0; /*Utilisé dans la version multithread */
    int nb_thread = 1;
    int verbose = 0;
    char ch;
    unsigned long* res;
    pthread_t tid;
    compteur_s c_s;

    assert(argc > 1);


    while ((ch = getopt(argc,argv,"vh")) != -1)
    {
      switch (ch)
      {

        case('h'):
          usage();
          exit(EXIT_SUCCESS);
          break;

        case('v'):
          verbose=1;
          break;

        default:
          break;
      }
    }

    argc-=optind;
    argv+=optind;

    if (argc > 1)
    {
      nb_thread = atoi(argv[1]); /*Nombre de thread défini par l'utilisateur*/
    }



    /* Quelle taille ? */
    assert(stat(argv[0], &st) != -1);
    tampon = malloc(st.st_size);
    assert(tampon != NULL);

    /* Chargement en mémoire */
    fd = open(argv[0], O_RDONLY);
    assert(fd != -1);
    while ((lus = read(fd, tampon + taille, st.st_size - taille)) > 0)
        taille += lus;
    assert(lus != -1);
    assert(taille == st.st_size);
    close(fd);

    /* Calcul proprement dit */
    /*assert(clock_gettime(CLOCK_MONOTONIC, &debut) != -1);*/
    cptr = compteur_gc(tampon, taille);
    /*assert(clock_gettime(CLOCK_MONOTONIC, &fin) != -1);*/

    /**
      * Compteur version multithread
      */

    /* On compte cette fois-ci le temps d'obtention du résultat pour la version multithread */
    assert(clock_gettime(CLOCK_MONOTONIC, &debut) != -1);
    for (i = 0 ; i < nb_thread ; i++)
    {
      c_s.taille = taille / nb_thread; /*Taille d'un bloc */
      c_s.bloc = tampon + (c_s.taille * i) ; /* Début de l'indice du bloc parcouru à partir de l'adresse du tampon (début fichier) */

      pthread_create(&tid, NULL, &mt_compteur_gc, &c_s);
      pthread_join (tid, (void **) &res);
      cptr_multithread += (unsigned long)res;
    }
    assert(clock_gettime(CLOCK_MONOTONIC, &fin) != -1);

    fin.tv_sec  -= debut.tv_sec;
    fin.tv_nsec -= debut.tv_nsec;
    if (fin.tv_nsec < 0) {
        fin.tv_sec--;
        fin.tv_nsec += 1000000000;
    }
    /* Affichage des résultats */
    if (verbose)
    {
      printf("Nombres de GC:   %ld\n", cptr);
      printf("Nombres de thread: %d\n", nb_thread);
      printf("Nombres de GC (version multithread): %ld\n", cptr_multithread);
      printf("Taux de GC: %lf\n", ((double) cptr) / ((double) taille));
      printf("Durée de calcul: %ld.%09ld\n", fin.tv_sec, fin.tv_nsec);
      printf("(Attention: très peu de chiffres après la virgule sont réellement significatifs !)\n");
    }

    /*Impression du résultat au format gnuplot, qui peut potentiellement être redirigé vers le fichier .dat */
    printf("%d %d %ld.%09ld\n",(int)taille, nb_thread, fin.tv_sec, fin.tv_nsec);
    return 0;
}
