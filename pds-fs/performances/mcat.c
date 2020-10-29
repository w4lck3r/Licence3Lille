
#include <unistd.h>
#include <assert.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>


/* Un tampon est alloué de façon dynamique afin de limiter les appels système*/
void mcat(int arg_n, char const *argv[]) {
  int MAX_BUFF_SIZE= atoi(getenv("MCAT_BUFSIZ"));
  char * buffer= (char *)malloc(MAX_BUFF_SIZE);

  int status;
  int open_file;
  int i;
  for(i=1;i<arg_n;i++)
  {
    open_file=open(argv[i],O_RDONLY);
    assert(open_file!=-1);
    while((status= read(open_file,buffer,MAX_BUFF_SIZE)) !=0){
      assert(status!=-1);
      write(STDOUT_FILENO, buffer, status);
    }
    close(open_file);
  }
}


int main(int argc, char const *argv[]) {
  assert(argc >1);
  mcat(argc,argv);
  return 0;
}