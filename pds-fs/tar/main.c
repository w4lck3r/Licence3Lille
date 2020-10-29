#include"lstar.h"
#include"arrondi.h"


/*
    fd == 0 == STDIN_FILENO -> STANDARD INPUT
    fd == 1 -> STANDARD OUTPUT
    fd == 2 -> ERROR	
*/
int decimalToOctal(int decimalnum)
{
    int octalnum = 0, temp = 1;

    while (decimalnum != 0)
    {
    	octalnum = octalnum + (decimalnum % 8) * temp;
    	decimalnum = decimalnum / 8;
        temp = temp * 10;
    }

    return octalnum;
}

int main(int argc, char *argv[]) {
    int fd;

    if (argc > 1 ) {
        fd = open(argv[1], O_RDONLY);
        if (fd < 1) {
            printf("Cannot open file %s\n", argv[1]);
            exit(-1);
        }
    } else {
        fd = STDIN_FILENO; // utiliser un pipe pour passer des arguments dans
        // l'entrée standard de ./lstar
    }

    struct posix_header hs;

    // boucle infini qui tourne par bloc de 512 jusqu'a ce qu'on peut plus lire les fichier
    while(read(fd, &hs, sizeof(hs))>1) {

       // trouve la taille d'un fichier (octets) et calcule le nombre de blocs
       // de 512 octets qu'il remplit après le bloc de description
       long long file_size = strtoll(hs.size, NULL, 8);
       int file_size_arrondie = arrondi(file_size);
       int file_blocks_number = file_size_arrondie / BUFFER;

       // récupération de la version du fichier à utiliser pour le vérifier

       char version_test[2];
       memcpy( version_test, &hs.version[0], 2 );

       /*
       on fait un break si ce qui était lu ne correspond pas au descripteur de fichier
       */
       if (strcmp(TMAGIC,hs.magic) != 0 || strcmp(TVERSION,version_test) != 0) {
          break;
       }

       // affichage des informations du fichier comme tar -tv.

        //recuperation et affichage du mode fichier

        int long mode = strtol(hs.mode,NULL,8);
        printf((S_ISDIR(mode)) ? "d" : "-");
        printf((mode&S_IRUSR) ? "r" : "-");
        printf((mode&S_IWUSR) ? "w" : "-");
        printf((mode&S_IXUSR) ? "x" : "-");
        printf((mode&S_IRGRP) ? "r" : "-");
        printf((mode&S_IWGRP) ? "w" : "-");
        printf((mode&S_IXGRP) ? "x" : "-");
        printf((mode&S_IROTH) ? "r" : "-");
        printf((mode&S_IWOTH) ? "w" : "-");
        printf((mode&S_IXOTH) ? "X" : "-");
        printf("\t");

        //affichage d prefix du fichier
            printf("%s", strcat(strcat(hs.prefix,"/"),hs.uname));
        //afficher le nom du fichier
            printf(" %s \t", hs.name);
        //affichage sa taille
            printf(" %lld  ", file_size);
        //recuperation et affichage du date fichier
        struct tm *info;
        char buffer[DATE_BUFFER_SIZE]; //un buffer pour le stockage du format date à 12 octets
        time_t time_l= strtol(hs.mtime,NULL, 8);
        info = localtime(&time_l);
        printf( "%s ", asctime(info));

        //affichage du type de fichier
       char flags= hs.typeflag;
       switch (flags)
	{
	    case  '0':
		printf("type du fichier: regular file\n");
		break;
	    case '1':
		printf("type du fichier: Link\n");
		break;
	    case '2':
		printf("type du fichier: reserved\n");
		break;
	    case '3':
		printf("type du fichier: Character special\n");
		break;
	    case '4':
		printf("type du fichier: Block special\n");
		break;
	    case '5':
		printf("type du fichier: Directory\n");
		break;
	    case '6':
		printf("type du fichier: FIFO\n");
		break;

	    default:
		printf("type du fichier: Error! flag type is not correct\n");
	}

    memset(hs.chksum, ' ', 8);
	hs.chksum[6]='\0';
	hs.chksum[7]=' ';

	size_t checksum = 0;
	const unsigned char* bytes= &hs;
	for( int i = 0; i < sizeof(struct posix_header); i++ ){
		checksum += bytes[i];
	}
    
	snprintf( hs.chksum, 8, "%06o", decimalToOctal(checksum));
    
    // on continue de lire les fichier en les sautant par la fin de fichier autant de foi qus'il
    // possède de blocs de données de 512 octets
       int i;
       for(i = 0; i < file_blocks_number ; i++) {
          lseek(fd, 0, SEEK_END);
       }
    }

    close(fd);

    return 0;
}
