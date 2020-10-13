all: main.out
stat.o: stat.c stat.h
	gcc -Wall -Wextra -g -c -o stat.o stat.c
main.out: main.c stat.o
	gcc -Wall -Wextra -g -o main.out main.c stat.o
clean:
	rm -fv *.o *.out 
