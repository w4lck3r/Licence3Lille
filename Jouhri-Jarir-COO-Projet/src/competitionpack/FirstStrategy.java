package competitionpack;
import java.util.*;


public 	class FirstStrategy implements SelectionStrategy {
	
	/**
	 * It returns a list of competitors, these competitors are going to play the final phase
	 * Selection type : first of each pool and fills with second then third .. until reach a number power of two of competitor 
	 * @param list of pools
	 * @return final phase competitors's list
	 */
	
	public ArrayList<Competitor> makeFinalPhase(ArrayList<Pool> poolList){
		ArrayList<Competitor> secondPlace = new ArrayList<Competitor>();
		ArrayList<Competitor> finalPoolList = new ArrayList<Competitor>();
		Map<Competitor,Integer> compRank = new HashMap<>();
		ArrayList<Map<Competitor,Integer>> compRank2 = new ArrayList<Map<Competitor,Integer>>();
		for (Pool p : poolList)
			compRank2.add(p.ranking());	
		for (Map<Competitor,Integer> pc : compRank2)
			finalPoolList.add((Competitor) pc.keySet().toArray()[0]);
		for (Map<Competitor,Integer> pc : compRank2)
			secondPlace.add((Competitor) pc.keySet().toArray()[1]);
        int finalSize =  finalPoolList.size();
        int finalSizePowerTwo = SelectionStrategy.fillNumberToPowerOfTwo(finalPoolList.size());
		if ( finalSize == finalSizePowerTwo ) {
			return finalPoolList;
		}
		else {
			for (int i = 0 ; i < (finalSizePowerTwo-finalSize) ; i++) {
				finalPoolList.add(secondPlace.get(i)); 
			}
		}
		return finalPoolList;
	}
}
