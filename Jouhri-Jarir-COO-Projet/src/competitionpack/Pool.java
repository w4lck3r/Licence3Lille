package competitionpack;
import java.util.*;


public class Pool extends Master {
	
	
	protected ArrayList<Pool> poolList;
	
	/* Construtor */
	public Pool(ArrayList<Competitor> competitors, Match match, SelectionStrategy selection) {
		super(competitors, match, selection);
		this.poolList = new ArrayList<Pool>();
		
	}
	
	/**
	 * returns the selection of the Pool  
	 * @return selection of the pool 
	 */
	public SelectionStrategy getStrategy() {
		return this.selection;
	}
	
	/**
	 * returns an ArrayList of pools   
	 * @return poolList of Pool
	 */
	public ArrayList<Pool> getPoolList(){
		return this.poolList;
	}
	
	/**
	 * returns the size of the pool list  
	 * @return size of the pool list 
	 */
	public int getPoolListSize() {
		return this.poolList.size();
	}

	/**
	 * returns a part of ArrayList of competitors given it starts with the element i1 and ends with the element i2
	 * @param competitors ArrayList of competitors
	 * @param i1 first index
	 * @param i2 second index
	 * @return return part of initial ArrayList competitors
	 */
	public ArrayList<Competitor> pieceOfCompetitors(ArrayList<Competitor> competitors,int i1 , int i2) {
		ArrayList<Competitor> res = new ArrayList<Competitor>();
		for (int i = i1; i<i2 ; i++) {
			res.add(competitors.get(i));
		}
		return res;
	}
	
	/**
	 * Create X pools depending of the number of competitors and separate the competitors in them 
	 * (few pools can have one short competitors comparing to the others which means we don't need an exact 
	 * number of competitors to be able to make pools).
	 * @param competitors an ArrayList of competitors
	 * @throws LackOfCompetitors
	 */
	public void makePools(ArrayList<Competitor> competitors) throws LackOfCompetitors { 
		Match match = new BasicMatch();
		int competitorsSize = competitors.size();
		ArrayList<Pool> res = new ArrayList<Pool>();
		if (competitorsSize < 6) {
			throw new LackOfCompetitors("You need atleast six competitors to start a Master competition.");
		}
		else {
			for (int i = 5; i>2 ; i--) {
				
				if (competitorsSize % i == 0 && this.poolList.size() == 0) {
					int divi = competitorsSize / i;
					for (int j = 1; j< i+1 ; j++) {
						res.add(new Pool( pieceOfCompetitors(competitors, ((j-1)*divi) , (j*divi) ) , match , this.selection));
					}
				}
				this.poolList = res;
				}	
			}
			if (res.size() == 0){
				int var = 0 ;
				int var2 = 1 ;
				int restant = competitorsSize % 4;
				int div = (competitorsSize / 4);
				for (int k = 1; k < 5 ; k++) {
					if (var < restant) {
						res.add(new Pool(pieceOfCompetitors(competitors, (((k-1)*div)+var) , (k*div) + var2 ) , match , this.selection));
						var++;
						var2++;
					}
					else if (var == restant){
						res.add(new Pool(pieceOfCompetitors(competitors, ((k-1)*div)+ restant  , (k*div) + restant ) , match , this.selection));
					}
				}
				this.poolList = res;
			}
			
			
	}
	
	/**
	 * return a commentary about the matches played in the pool
	 * @param competitors ArrayList of competitors
	 * @return details of the played league 
	 * @throws LackOfCompetitors
	 */
	public String playPoolPhase(ArrayList<Competitor> competitors) throws LackOfCompetitors {
		int cpt = 1;
		makePools(competitors);
		League championnat = new League(competitors,this.match);
		String commentary = "\n<<<<< Playing pool phase >>>>> \n\n";	
		for(Pool x : this.poolList) {
			commentary = commentary + "\n ----> Pool " + cpt +" :\n\n";
			cpt+=1;
			commentary = commentary + championnat.play(x.getCompetitors());
		}
		return commentary;
	
	}
	
}
