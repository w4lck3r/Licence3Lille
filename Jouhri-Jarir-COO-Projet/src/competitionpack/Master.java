package competitionpack;

import java.util.*;




public class Master extends Competition{
	protected Pool pools ;
	protected SelectionStrategy selection;
	
	/* Contructor */ 
	public Master(ArrayList<Competitor> competitors,Match match,SelectionStrategy selection) {
		super(competitors,match);
		this.selection=selection;
	}
	
	/**
	 * return Pools of the Master
	 * @return the Pool of the master
	 */
	public Pool getPools() {
		return this.pools;
	}
	/**
	 * return the selection of Master
	 * @return master's selection
	 */
	public SelectionStrategy getSelection() {
		return this.selection;
	}
	
	/**
	 * return a commentary about the matches played in the master
	 * @param com ArrayList of competitors
	 * @return details of the played master 
	 */
	public String play(ArrayList<Competitor> com){		
		String commentary = "";
		ArrayList<Competitor> finalPhaseCompetitors = new ArrayList<Competitor>();
		Pool phaseOne = new Pool (this.competitors, this.match, this.selection);
		try {
			phaseOne.makePools(this.competitors);
		}
		catch (LackOfCompetitors e) {
			System.out.println("You need atleast six competitors to start a Master competition.");
		}
		try {
			commentary = phaseOne.playPoolPhase(this.competitors);
		}
		catch (LackOfCompetitors e) {
		
		}
		this.pools = phaseOne;
		finalPhaseCompetitors = this.getSelection().makeFinalPhase(phaseOne.getPoolList());
		Tournament finalTournament = new Tournament(finalPhaseCompetitors,this.match);
		commentary = commentary + "\n<<<<<<<< Final Phase : >>>>>>>>\n\n" + finalTournament.play(finalPhaseCompetitors);

		return commentary;
	}
	
	   /**
	   * Journalist's commentary about the result of the master.
	   */
		public void journalistCommentary() {
			/*TODO*/
		}
	

}
