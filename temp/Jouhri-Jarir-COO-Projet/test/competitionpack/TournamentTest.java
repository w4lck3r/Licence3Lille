package competitionpack;

import java.util.*;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;


public class TournamentTest extends CompetitionTest {
	private Tournament tournament;
	private Tournament tournamentNotPowerOfTwo;


  protected Competition compCreate(){
	ArrayList<Competitor> competitorsList = new ArrayList<Competitor>();
    Competitor c1 = new Competitor("competitor1");
    Competitor c2 = new Competitor("competitor2");
    Competitor c3 = new Competitor("competitor3");
    Competitor c4 = new Competitor("competitor4");
	competitorsList.add(c1);
    competitorsList.add(c2);
    competitorsList.add(c3);
    competitorsList.add(c4);
    Match match = new BasicMatch();
    Tournament tournament = new Tournament(competitorsList,match);
    return tournament;
  }


  @Before
  public void initTournament () {
    this.tournament = new Tournament(new ArrayList<Competitor>(),new BasicMatch());
    Match theMatch = new BasicMatch();
    /* creation of an incorrect list of competitors */
    ArrayList<Competitor> competitorsList2 = new ArrayList<Competitor>();
    Competitor x1 = new Competitor("one");
    Competitor x2 = new Competitor("two");
    Competitor x3 = new Competitor("three");
	
	competitorsList2.add(x1);
    competitorsList2.add(x2);
    competitorsList2.add(x3);
	/* creating the tournament */
    this.tournamentNotPowerOfTwo = new Tournament(competitorsList2,theMatch);
  }

    @Test
	public void testCreation() {
	  assertNotNull(competition);
	}
  	/* successful tournament play with correct competitors number */
	@Test 
	public void successfulTournamentPlayTest() {
		int cpt = 0;
		competition.play(competition.getCompetitors());
		int competitorSize = competition.getCompetitorsize();
		Iterator<Competitor> iteration = competition.getCompetitors().iterator();
		while (iteration.hasNext()){
			cpt += iteration.next().getScore();
		}
		assertEquals(cpt,competitorSize-1);
	}
  
  @Test
  public void testCopyCompetitors () {
    ArrayList<Competitor> copy = this.tournamentNotPowerOfTwo.copyCompetitors(this.tournamentNotPowerOfTwo.getCompetitors());
    int size = copy.size();
    assertEquals(copy.size(),this.tournamentNotPowerOfTwo.getCompetitorsize());
    for (int i=0; i<size; i++) {
      assertSame(this.tournamentNotPowerOfTwo.getCompetitors().get(i),copy.get(i));
    }
  }
  

  /********** Power of two tests ************/
  
  /* power of two exception test */
  @Test(expected=NbOfCompetitorIncorrect.class)
  public void incorrectPowerOfTwoTest() throws NbOfCompetitorIncorrect{
	  this.tournament.puissanceDeux(6);
  }
  
  /* power of two normal test */
  @Test
  public void powerOfTwoTest(){
    try {
      assertTrue(this.tournament.puissanceDeux(2));
      assertTrue(this.tournament.puissanceDeux(8));
      assertTrue(this.tournament.puissanceDeux(32));
    }
    catch (NbOfCompetitorIncorrect e){
      fail();
    }
  }
  

  public static junit.framework.Test suite() {
    return new junit.framework.JUnit4TestAdapter(competitionpack.TournamentTest.class);
  }


}
