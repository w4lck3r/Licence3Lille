lstar: main.o lstar.o arrondi.o
	gcc main.o lstar.o arrondi.o -o lstar.out
main.o: main.c
	gcc -c main.c
lstar.o: lstar.c lstar.h
	gcc -c lstar.c
arrondi.o: arrondi.c arrondi.h
	gcc -c arrondi.c
clean:
	rm *.o lstar.out