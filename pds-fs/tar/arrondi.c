
long arrondi(long n)
{
	if((n%BUFFER) == 0)
		return n;
	else{
		return n + BUFFER;
	}
}

