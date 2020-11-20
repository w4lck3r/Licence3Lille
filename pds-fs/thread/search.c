#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <assert.h>
#define SIZE_MIN 6
void *search_wrapper(void *);

typedef struct thrd_p{
	int *tab;
	unsigned int size;
	int v;
	
	int res;

}thrd_s;


int search(int*tab, unsigned int size, int v){
 int i=0;
 int res;
 if(size < SIZE_MIN){
  while( (i<size) && (tab[i]!= v)) i++;
 	return (i<size) ? (i) : -1;
 }	
 



 thrd_s t;
 t.tab = tab;
 t.size = size/2;
 t.v = v;
 pthread_t tid1;
 pthread_create(&tid1, NULL, search_wrapper, (void*)&t);
 

 res = search(&tab[size/2],size-size/2,v);
 if( !res ){
	 res += size/2;
 }
 pthread_join(tid1,NULL);	
 
 return t.res >=0 ? t.res : res;

 }


void *search_wrapper(void *arg){
	
	thrd_s * t =(thrd_s *) arg;
	for(int i=0; i<= t->size;i++){
		printf("thread computing search in tab[%d]\n",i);
	} 
	t->res = search(t->tab,t->size,t->v);
	
	return NULL;

}

int main() { 

	int tab[8] = {1,2,10,13,12,17,16,9};
	int value = search(tab,7,13);
	
	printf("the value  = %d\n",value);
	return 0;

}