package competitionpack;
import static org.junit.Assert.*;

import org.junit.Test;


public class BasicMatchTest extends MatchTest {

  protected Match createMatch() {
    return new BasicMatch();
  }

  @Test
	public void testCreation() {
    assertNotNull(match);
	}


  public static junit.framework.Test suite() {
    return new junit.framework.JUnit4TestAdapter(competitionpack.BasicMatchTest.class);
  }
}
