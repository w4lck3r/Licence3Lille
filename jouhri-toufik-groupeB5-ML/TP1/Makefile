%.res: %.run %.date %.ampl
	ampl $< > $@ && cat $@

tp1.res: %.run %.data %.ampl
	ampl %.run > %.res && cat %.res

