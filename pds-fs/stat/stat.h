#ifndef KSTAT_H
#define KSTAT_H
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <assert.h>
#include <pwd.h>
#include <time.h>
#include <grp.h>
void displayTime(struct stat sb);
void displayStat(struct stat sb,char * fileName);

#endif
