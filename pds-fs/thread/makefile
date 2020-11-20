all: fibo search

fibo: fibo.c
	gcc -Wall -Wextra -g fibo.c -o fibo -pthread

search : search.c
	gcc -Wall -Wextra -g search.c -o search -pthread

clean:
	rm -rf *.o

mrproper: clean
	rm -rf fibo search

.PHONY: all