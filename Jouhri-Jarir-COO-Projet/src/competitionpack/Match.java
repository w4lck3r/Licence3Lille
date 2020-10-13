package competitionpack;


public abstract class Match {
  /* Constructor */
  public Match(){
    super();
  }

  /**
   * returns the winner of a one versus one match
   * @param c1 Competitor
   * @param c2 the opponent
   * @return the winner of the match
   */
  public abstract Competitor duel(Competitor c1, Competitor c2); 
}
