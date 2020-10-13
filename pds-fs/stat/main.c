#include "stat.h"
int main(int argc, char *argv[])
{
    
  /**
   * Declaration des variables
   */
  struct stat sb; 
  char *fileName = NULL;
  fileName = argv[1];
  /*
  si l'utilisateur entre plus/moins que 2 arguments
  */
  if (argc != 2) 
  {  
    fprintf(stderr, "Usage: %s <pathname>\n", argv[0]);
    exit(EXIT_FAILURE);
  }
  else
  {
    /*
    appel de stat() pour recuperer
    les metadonnee
    */
    stat(argv[1],&sb);
    if (stat(argv[1], &sb) == -1)
    {
      perror("stat");
      return 0;
      exit(EXIT_SUCCESS);
    }
    displayStat(sb,fileName);
  }    
  exit(EXIT_SUCCESS);
}
    /*
    Cordiali saluti
    */