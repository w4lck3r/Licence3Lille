package competitionpack;

import org.junit.Before;
import static org.junit.Assert.*;
import org.junit.Test;


public abstract class MatchTest{

  protected Match match;
  protected abstract Match createMatch();
  
  public class MockMatch extends Match{
	  
	  public Competitor duel(Competitor c1, Competitor c2){
	    return c1;
	  }
  }

  @Before
  public void init(){
    this.match = this.createMatch();
  }

  @Test
  public void duelTest(){
    Competitor one = new Competitor("one");
    Competitor two = new Competitor("two");
    MockMatch match = new MockMatch();
    assertSame(match.duel(one,two),one);
  }


  public static junit.framework.Test suite(){
    return new junit.framework.JUnit4TestAdapter(competitionpack.MatchTest.class);
  }

}
