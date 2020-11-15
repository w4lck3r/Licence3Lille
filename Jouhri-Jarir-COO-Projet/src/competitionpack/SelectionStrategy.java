package competitionpack;
import java.util.*;

public interface SelectionStrategy {
	
		public ArrayList<Competitor> makeFinalPhase(ArrayList<Pool> poolList);
		
		
		/**
	     * It returns the argument number if it's a power of two , otherwise it returns the next number power of two of argument number 
	     * @param number an integer number
	     * @return number power of two
	     */
		public static int fillNumberToPowerOfTwo(int number){
			int cpt = 1;
			while (cpt <= number) {
				cpt = cpt * 2;
				if (number == cpt) {return number;}
			}
			return cpt;
		}
}
