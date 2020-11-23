#include <stdint.h>
#include <assert.h>
#include "pile.h"

void init_pile(pile * p) {
    p->head = 0;
}

int pile_vide(pile * p) {
    return p->head == 0;
}

bloc_t depile(pile * p) {
    assert(p->head > 0);
    p->head--;
    return p->data[p->head];
}

void empile(pile * p, bloc_t e) {
    assert(p->head < TAILLE_PILE);
    p->data[p->head] = e;
    p->head++;
}
