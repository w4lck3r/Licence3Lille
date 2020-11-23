#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <assert.h>
#include "tri.h"
#include "rapide.h"
#include "main.h"
#include <time.h>


int opt_verbeux = 0;

static int opt_affiche  = 0;
static int opt_controle = 0;
static int opt_texte    = 0;
static int opt_temps = 0; /*Option ajoutée qui permet d'obtenir la durée d'excécution de rapide */
static long longueur    = -1;
static unsigned int nb_threads = 1;

void usage() {
    fprintf(stderr, "Usage: tri-rapide [options] [fichier]\n");
    fprintf(stderr, "Trie les entiers contenus dans le fichier donné\n");
    fprintf(stderr, "(Par défaut, trie l’entrée standard ; indiquer -l dans ce cas)\n");
    fprintf(stderr, "Options:\n");
    fprintf(stderr, "  -h      affiche ce message\n");
    fprintf(stderr, "  -T      Affiche le temps qu'il a fallu pour trier le tableau \n");
    fprintf(stderr, "  -t      choisit le format « texte » \n");
    fprintf(stderr, "          (il est nécessaire d’indiquer -l dans ce cas)\n");
    fprintf(stderr, "  -c      contrôle que le résultat final est trié (débogage)\n");
    fprintf(stderr, "  -a      affiche le tableau trié (sur la sortie standard)\n");
    fprintf(stderr, "  -v      affiche des informations supplémentaires\n");
    fprintf(stderr, "  -n NBTH utilise NBTH threads (défaut = %d)\n", nb_threads);
    fprintf(stderr, "  -l LONG indique le nombre d’éléments à lire dans le fichier (défaut = taille du fichier binaire)\n");
    fprintf(stderr, "  -s TAIL choisit la taille seuil des blocs « longs » (défaut = %ld)\n", seuil_bloc_long);

    exit(EXIT_FAILURE);
}

void print_options() {
    fprintf(stderr, "verbeux                         = %d\n",  opt_verbeux);
    fprintf(stderr, "format texte                    = %d\n",  opt_texte);
    fprintf(stderr, "contrôle final                  = %d\n",  opt_controle);
    fprintf(stderr, "affichage final                 = %d\n",  opt_affiche);
    fprintf(stderr, "nombre d’entiers à lire         = %ld\n", longueur);
    fprintf(stderr, "nombre de threads               = %d\n",  nb_threads);
    fprintf(stderr, "taille minimale des blocs longs = %ld\n", seuil_bloc_long);
}

int main(int argc, char *argv[]) {
    char *fichier;
    int c;
    struct stat st;
    struct timespec debut, fin;

    while ((c = getopt(argc, argv, "Thtcavn:l:s:")) != -1) {
        switch (c) {
        case 't':
            opt_texte = 1;
            break;
        case 'c':
            opt_controle = 1;
            break;
        case 'a':
            opt_affiche = 1;
            break;
        case 'v':
            opt_verbeux = 1;
            break;
        case 'T':
            opt_temps = 1;
            break;
        case 'n':
            nb_threads = (unsigned long) strtol(optarg, NULL, 10);
            break;
        case 'l':
            longueur = strtol(optarg, NULL, 10);
            break;
        case 's':
            seuil_bloc_long = (unsigned long) strtol(optarg, NULL, 10);
            break;
        case 'h':
        default:
            usage();
        }
    }

    if (optind == argc)
        fichier = NULL;
    else
        fichier = argv[optind];

    if (longueur < 0) {
        if (!opt_texte && fichier != NULL) {
            /* Quelle taille ? */
            assert(stat(fichier, &st) != -1);
            longueur = st.st_size / sizeof(base_t);
        } else {
            fprintf(stderr, "Vous devez préciser la longueur de l’entrée\n");
            usage();
        }
    }

    if (opt_verbeux)
        print_options();

    if (opt_texte)
        tableau = charge_tableau_textuel(fichier, longueur);
    else
        tableau = charge_tableau_binaire(fichier, longueur);

    assert(clock_gettime(CLOCK_MONOTONIC, &debut) != -1);
    rapide(longueur, nb_threads);
    assert(clock_gettime(CLOCK_MONOTONIC, &fin) != -1);

    fin.tv_sec  -= debut.tv_sec;
    fin.tv_nsec -= debut.tv_nsec;
    if (fin.tv_nsec < 0) {
        fin.tv_sec--;
        fin.tv_nsec += 1000000000;
    }

    if (opt_controle)
        verifie_trie(tableau, longueur);

    if (opt_affiche) {
        if (opt_texte)
            affiche_tableau_textuel(tableau, longueur);
        else
            affiche_tableau_binaire(tableau, longueur);
    }

    if (opt_temps)
    {
      printf("%d %d %ld.%09ld\n",(int)longueur, nb_threads, fin.tv_sec, fin.tv_nsec);
    }

    return 0;
}
