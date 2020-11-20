/*Question1:
------------
*Le probleme qu'on peut rencontrer c'est que les mêmes threads peuvent avoir
 acces à la même variable en même temps ce qui n'assure pas une synchronisation des données

 Question2: 

 On utilise un verrou d’exclusion mutuelle "MUTual EXclusion" est très pratique pour protéger des données
 partagées de modifications concurrentes et pour implémenter dessections critiques.
 
 Question 3:
 on creer par exemple deux thread et avec un mutex on 

*/

int unique() {
    static int count = 0; /* variable globale à visibilité locale */
    count++;
	pthread_mutex_lock(&globale_lock);

    return count;
}
int main(){
	
}