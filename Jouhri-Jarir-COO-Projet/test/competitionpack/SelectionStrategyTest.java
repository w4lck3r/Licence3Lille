package competitionpack;
import static org.junit.Assert.assertEquals;



import org.junit.Test;
public class SelectionStrategyTest {

	
	@Test
	public void fillNumberToPowerOfTwoTest() {
		assertEquals(SelectionStrategy.fillNumberToPowerOfTwo(8),8);
		assertEquals(SelectionStrategy.fillNumberToPowerOfTwo(9),16);
	}
	
	
	
	
	  public static junit.framework.Test suite() {
			return new junit.framework.JUnit4TestAdapter(competitionpack.SelectionStrategyTest.class);
	}
}

