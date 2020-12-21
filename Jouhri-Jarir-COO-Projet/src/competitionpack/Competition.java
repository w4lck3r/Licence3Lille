package competitionpack;
import java.util.*;
import competitionpack.*;



public abstract class Competition{

  protected final ArrayList<Competitor> competitors;
  protected final Match match;
  private Collection<CompListener> listenerList = new HashSet<CompListener>();

   /* Constructor */
  public Competition(ArrayList<Competitor> competitors, Match match){
	this.match = match;
	this.competitors = competitors;
	
  }
  
  /**
   * add the listener to the list
   * @param x the listener to add to the list
   */
  public void addListener(CompListener x) {
		listenerList.add(x);		
	}
  
  /**
   * delete the listener from the list
   * @param x the listener targeted to get deleted
   */
	public void removeListener(CompListener x) {
		listenerList.remove(x);
	}

  /**
   * starts event of listeners in the list 
   */
	public void endCompetitionDetected() {
		for (CompListener competitionObserver : listenerList) {
			competitionObserver.competitionEvent(this);
		}
  }
  /**
   * returns the number of competitors in the competition
   * @return size of the competitor's list
  */
  public int getCompetitorsize(){
	  return this.competitors.size();
  }
  
  /**
   * returns the list of competitors
   * @return the list of competitors
   */
  public ArrayList<Competitor> getCompetitors(){
    return this.competitors;
  }

  /**
   * play matches of a competition
   */
  public void play(){
    try {
      this.enoughCompetitors(this.competitors);
      System.out.println(this.play(this.competitors));
    }
    catch (LackOfCompetitors e) {
      System.out.println("You need atleast two competitors to start a competition.");
    }
  }

  /**
   * throws LackOfCompetitors exception if there is a lack of competitors
   * @param competitors list of competitors
   * @exception LackOfCompetitors if there is less than two competitors
   */
  public void enoughCompetitors(ArrayList<Competitor> competitors) throws LackOfCompetitors{
    if (competitors.size()<2) {
      throw new LackOfCompetitors("You need atleast two player to start a competition");
    }
  }

  /**
   * return the winner from a one versus one situation
   * @param c1 first competitor
   * @param c2 his opponent (competitor)
   * @return winner of the duel
   */
  public Competitor winner(Competitor c1, Competitor c2){
    Competitor winner = this.match.duel(c1 , c2);
    return winner;
  }
  
  /**
   * this method returns a commentary of the played match
   * @param competitors the list of competitors
   * @return commentary and details about the played match
   */
  public abstract String play(ArrayList<Competitor> competitors);
  public abstract void journalistCommentary();

  /**
   * return the score of competitors from the highest to the lowest
   * @return Map with competitors and their scores
   */
  public  Map<Competitor,Integer> ranking() {
    Map<Competitor, Integer> rank = new HashMap<>();
    for (Competitor competitor : this.competitors) {
        rank.put(competitor, competitor.getScore());
    }
    return MapUtil.sortByDescendingValue(rank);
  }
}
