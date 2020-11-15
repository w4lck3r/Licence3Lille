package competitionpack;

import java.util.*;

public class Tournament extends Competition {

  /* Constructor */
  public Tournament(ArrayList<Competitor> competitors, Match match){
    super(competitors,match);
  }

  /**
   * return an NbCompetitorsNotCorrectForTournament Exception if the number of Competitors are not a power of two
   * @param listsize number to check
   * @exception NbCompetitorsNotCorrectForTournament if the number of Competitors is not a power of two
   * @return true otherwise
   */
  public boolean puissanceDeux (int listsize) throws NbOfCompetitorIncorrect {
    if (listsize%2 != 0) {
      throw new NbOfCompetitorIncorrect("You need a number power of two of competitors to start a tournament.");
    }
    else if (listsize == 2){ 
      return true;
    }
    else {
      return puissanceDeux(listsize/2);
    }
  }

  /**
   * returns a copy of the competitors list
   * @param competitors list of competitors
   * @return a copy the given list
   */
  public ArrayList<Competitor> copyCompetitors(ArrayList<Competitor> competitors){
    ArrayList<Competitor> copy = new ArrayList<Competitor>();
    Iterator<Competitor> iteration = competitors.iterator();
    while (iteration.hasNext())
    {
      copy.add(iteration.next());
    }
    return copy;
  }

  /**
   * returns details about the played match
   * @param competitors list of competitors
   * @return details about the played match
   */
  public String play(ArrayList<Competitor> competitors){
    try{
      String commentary = "";
      int competitorsSize = competitors.size();
      ArrayList<Competitor> copy = copyCompetitors(competitors);
      puissanceDeux(competitorsSize);
      int copySize = copy.size();

      while (copySize!=1) {
        for (int i=0;i<copy.size();i++){
          Competitor c1 = copy.get(i);
          Competitor c2 = copy.get(i+1);
          Competitor winner = this.winner(c1,c2);

          if (c1.equals(winner)){
            copy.remove(c2);
            copySize--;
          }
          else{
            copy.remove(c1);
            copySize--;
          }

          commentary = commentary+c1.getName()+" vs "+c2.getName()+" --> "+winner.getName()+" wins!\n";
        }
      }
      return commentary;
    }
    catch (NbOfCompetitorIncorrect e){
      return e.toString();
    }
  }
}
