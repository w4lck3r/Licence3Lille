#include <stdint.h>
#ifndef _PILE_H_
#define _PILE_H_


typedef int32_t pos_t;          

/* Stack */

#define TAILLE_PILE 128

typedef struct bloc_s {
    pos_t debut, fin;
}   bloc_t;

typedef struct pile_s {
    unsigned int head;
    bloc_t data[TAILLE_PILE];
}   pile;

void   init_pile (pile *);
int    pile_vide (pile *);
void   empile    (pile *, bloc_t);
bloc_t depile    (pile *);
#endif
