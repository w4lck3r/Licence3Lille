package competitionpack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SecondStrategy implements SelectionStrategy {
	/**
	 * It returns a list of competitors, these competitors are going to play the final phase
	 * Selection type : first and second of each pool and fills third and fourth .. until reach a number power of two of competitor 
	 * @param list of pools
	 * @return final phase competitors's list
	 */
	
	public ArrayList<Competitor> makeFinalPhase(ArrayList<Pool> poolList){
		
		ArrayList<Competitor> finalPoolList = new ArrayList<Competitor>();
		ArrayList<Competitor> thirdPlace = new ArrayList<Competitor>();		
		Map<Competitor,Integer> compRank = new HashMap<>();
		
		ArrayList<Map<Competitor,Integer>> compRank2 = new ArrayList<Map<Competitor,Integer>>();
		
		for (Pool p : poolList)
			compRank2.add(p.ranking());	
		for (Map<Competitor,Integer> pc : compRank2)
			finalPoolList.add((Competitor) pc.keySet().toArray()[0]);
		for (Map<Competitor,Integer> pc : compRank2)
			finalPoolList.add((Competitor) pc.keySet().toArray()[1]);
		for (Map<Competitor,Integer> pc : compRank2)
			if (pc.size() >= 3) {
				thirdPlace.add((Competitor) pc.keySet().toArray()[2]);
			}
        int finalSize =  finalPoolList.size();
        int finalSizePowerTwo = SelectionStrategy.fillNumberToPowerOfTwo(finalPoolList.size());
		if ( finalSize == finalSizePowerTwo ) {
			return finalPoolList;
		}
		else {
			for (int i = 0 ; i < (finalSizePowerTwo-finalSize) ; i++) {
				finalPoolList.add(thirdPlace.get(i)); 
			}
		}	
		return finalPoolList;
	
	}

}
