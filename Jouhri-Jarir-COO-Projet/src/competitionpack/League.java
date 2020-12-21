package competitionpack;

import java.util.*;

public class League extends Competition {

  /* Constructor */
  public League(ArrayList<Competitor> competitors,Match match){
    super(competitors,match);
  }

  /**
   * returns details about the played match
   * @param competitors list of competitors
   * @return details about the played match
   */
  
  public String play(ArrayList<Competitor> competitors){
	  
    String commentary = "";
    for (int a = 0 ; a<competitors.size() ; a++){
      for (int b = 0; b<competitors.size() ; b++){
        if (a != b){
          Competitor one = competitors.get(a);
          Competitor two = competitors.get(b);
          Competitor winner = this.winner(one,two);
          commentary = commentary +one.getName()+" vs "+two.getName()+" --> "+winner.getName()+" wins!\n";
          
        }    
      }
    }
    return commentary;
  }
  /**
   * Journalist's commentary about the result of the League
   */
  public void journalistCommentary() {
    Map<Competitor,Integer> res = this.ranking();
    System.out.println("\n<<<<<<< Media >>>>>>>");
    for (Map.Entry<Competitor,Integer> entry : res.entrySet())  
      System.out.println(entry.getKey().toString2());
  }
}
