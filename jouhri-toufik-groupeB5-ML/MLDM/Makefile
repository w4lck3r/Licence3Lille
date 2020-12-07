%.res: %.run %.date %.ampl
	ampl $< > $@ && cat $@
 
DM.run: Q1.ampl
	ampl DM.run > Q1.res && cat Q1.res
