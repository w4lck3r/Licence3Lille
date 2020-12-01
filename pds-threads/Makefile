CC      = gcc

CFLAGS  = -Wall -Wextra
CFLAGS += -g
CFLAGS += -pthread

LDFLAGS = -pthread

TOUS := aleazard compteur-gc tri-rapide

tout: ${TOUS}

tri-rapide: pile.o tri.o rapide.o
	${CC} ${LDFLAGS} -o $@ $^

%.o: %.c
	${CC} ${CFLAGS} -c $<

%: %.o
	${CC} ${LDFLAGS} -o $@ $^

%: %.c

# Configure des cibles pour l’intégration continue
compteur-gc-ci: CFLAGS+=-Werror
compteur-gc-ci: compteur-gc

tri-rapide-ci: CFLAGS+=-Werror
tri-rapide-ci: tri-rapide

clean:
	rm -f core *.o

compteur: tout
	./aleazard 1000 > res_aleazard.txt
	./compteur-gc -v res_aleazard.txt 8
	rm -f res_aleazard.txt

rapide: tout
	dd if=/dev/urandom of=/tmp/alea bs=1048576 count=16
	./tri-rapide -vcTn 12 /tmp/alea

dat-compteur: tout
	./test.sh

dat-rapide: tout
	./test.sh

gnuplot-compteur: dat-compteur
	./compteur-gc.gp

gnuplot-rapide: dat-rapide
	./tri-rapide.gp


realclean: clean
	rm -f ${TOUS}
	rm -f *.txt
	rm -f *.png
	rm -f *.dat

.PHONY: all clean realclean
