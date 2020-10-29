
CC      = gcc

CFLAGS  = -Wall -Wextra -ansi -pedantic
CFLAGS += -D_XOPEN_SOURCE=500
CFLAGS += -g

mcat: mcat.o
	$(CC) $(LDFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $<

test: mcat
	chmod +x ./test.sh
	dd if=/dev/zero of=/tmp/test1 count=20000 bs=4096
	./test.sh
	gnuplot mcat.gp


clean:
	rm -f *.o mcat mcat.dat test1
