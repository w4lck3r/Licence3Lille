package competitionpack;

import java.util.*;
import static org.junit.Assert.*;

import org.junit.Test;


public class LeagueTest extends CompetitionTest{

  protected Competition compCreate(){
	/* creating a list of competitors */
	ArrayList<Competitor> listCompetitors = new ArrayList<Competitor>();
	/* creating competitors */
    Competitor x = new Competitor("one");
    Competitor y = new Competitor("two");
    Competitor z = new Competitor("three");
    /* adding competitors to the list */
	listCompetitors.add(x);
    listCompetitors.add(y);
    listCompetitors.add(z);
    /* creating the league */
	Match match = new BasicMatch();
    League league = new League(listCompetitors,match);
    return league;
  }

  	@Test
	public void createTest(){
    assertNotNull(competition);
	}
  	
  	/* test of league play method */
	@Test 
	public void testPlay(){
		competition.play(competition.getCompetitors());
		int competitorsSize = competition.getCompetitorsize();
		int cpt = 0;
		Iterator<Competitor> iteration = competition.getCompetitors().iterator();
		
        while (iteration.hasNext()){
			cpt+=iteration.next().getScore();
		}
		assertEquals(competitorsSize*2,cpt);
	}
  

  public static junit.framework.Test suite(){
    return new junit.framework.JUnit4TestAdapter(competitionpack.LeagueTest.class);
  }
}
