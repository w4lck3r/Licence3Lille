#include <unistd.h>
#include <stdio.h>
#include <pthread.h>
#include <assert.h>

int fib(int n) {
    if (n<2)
        return n;
    else {
        int x, y;
        x = fib(n-1);
        y = fib(n-2);
        return x + y;
    }
}


int main(int argc, char *argv[]) {
    int n, res;
    pthread_t tid;
    r = pthread_create(&tid,NULL,fib,NULL)

    n = strtol(argv[1], NULL, 10);
    res = fib(n);


    printf("fib(%d)=%d\n", n, res);
    exit(EXIT_SUCCESS);