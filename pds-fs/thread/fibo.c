#include <unistd.h>
#include <stdio.h>
#include <pthread.h>
#include <assert.h>
#include <stdlib.h>

void *my_thread(void * arg);

struct fonct_arg_s{
    int n;
    int ret;
};

int fib(int n) {
    if (n<2)
        return n;
    else {
        struct fonct_arg_s x,y;
        x.n = n-1;
        y.n = n-2;
        pthread_t tid1,tid2;
        pthread_create(&tid1, NULL, my_thread, (void*)&x);
        pthread_create(&tid2, NULL, my_thread, (void*)&y);
        pthread_join(tid1, NULL);
        pthread_join(tid2, NULL);

        return x.ret + y.ret;
    }
}
void *my_thread(void * arg){
    struct fonct_arg_s * p_arg= (struct fonct_arg_s *) arg;
    printf("thread computing fib(%d)\n", p_arg->n);
    p_arg->ret = fib(p_arg->n);

    return NULL;
}

int main(int argc, char *argv[]) {
    int n, res;
    n = strtol(argv[1], NULL, 10);
    res = fib(n);


    printf("fib(%d)=%d\n", n, res);
    exit(EXIT_SUCCESS);
}