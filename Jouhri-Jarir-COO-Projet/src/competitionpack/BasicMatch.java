package competitionpack;

import java.util.*;


/**
 * ClassicalMatch describe Match were Competitors have the same chance to be the winner
 * @see Match
 * @version 1.0
 */
public class BasicMatch extends Match{

  /* Constructor */
  public BasicMatch(){
    super();
  }

  /**
   * return the winner of one match between two competitors
   * @param c1 a Competitor
   * @param c2 another Competitor
   * @return the winner of the match between c1 and c2
   */
  public Competitor duel(Competitor c1, Competitor c2){
    Random r = new Random();
    int n = r.nextInt(2); 
    // Always one winner
    if (n==0) {
      c1.addScore();
      return c1;
    }
    else {
      c2.addScore();
      return c2;
    }
  }
  
}
