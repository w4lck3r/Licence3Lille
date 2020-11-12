#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <assert.h>

void *search_wrapper(void *);

typedef struct thrd_p{
	int *tab;
	unsigned int size;
	int v;
	
	int res;

}thrd_s;


int search(int*tab, unsigned int size, int v){
 thrd_s t;
 pthread_t tid;
 int r;	
 int res;
 int i=0;

 while( (i<size) && (tab[i]!= v)) i++;
 return (i<size) ? (i) : -1;

 t.tab = tab;
 t.size = size/2;
 t.v = v;
 
 r = pthread_create(&tid, NULL, &search_wrapper, &t);
 assert(r==0);
 
 res = search(&tab[size/2],size-size/2,v);
 if( !res ){
	 res += size/2;
 }
 
 pthread_join(tid,NULL);	
 assert(r==0);

 if( t.res >= 0)
	return t.res;
}

void *search_wrapper(void *arg){
	
	thrd_s *t = arg;
	t->res = search(t->tab,t->size,t->v);
	return NULL;

}

int main(int argc, char*argv[]) {
 
int tab[8] = {1,2,10,13,12,17,16,9};
thrd_s t;
int valeur = search(tab,7,13);
printf("valeur de la fonction %d\n",valeur);
return 0;
	

}