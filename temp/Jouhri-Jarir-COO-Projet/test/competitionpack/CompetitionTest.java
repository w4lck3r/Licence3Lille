package competitionpack;
import static org.junit.Assert.*;
import java.util.ArrayList;
import org.junit.Before;
import org.junit.Test;


public abstract class CompetitionTest {
  protected Competition competition;
  protected abstract Competition compCreate();

  @Before
  public void init(){
    this.competition = this.compCreate();
  }
  
   
  @Test
  public void winnerTest(){
    Competitor one = new Competitor("one");
    Competitor two = new Competitor("two");
    Competitor winner =  this.competition.winner(one,two);
    if (one.getScore() > two.getScore()) {
      /* assertSame: Asserts that two objects refer to the same object.*/
      assertSame(winner,one);
    }
    else {
      assertSame(winner,two);
    }
 }


  public static junit.framework.Test suite(){
    return new junit.framework.JUnit4TestAdapter(competitionpack.CompetitionTest.class);
  }

}
