package competitionpack;
import java.util.*;
import static org.junit.Assert.*;
import org.junit.Test;


public class SecondStrategyTest {
	private ArrayList<Competitor> listComp= new ArrayList<Competitor>();
	private SelectionStrategy selection;
	@Test
	public void testFirstSelection() {
		SelectionStrategy selection = new SecondStrategy();
		Competitor c1 = new Competitor("c1");
		Competitor c2 = new Competitor("c2");
		Competitor c3 = new Competitor("c3");
		Competitor c4 = new Competitor("c4");
		Competitor c5 = new Competitor("c5");
		Competitor c6 = new Competitor("c6");
		Competitor c7 = new Competitor("c7");
		Competitor c8 = new Competitor("c8");
		listComp.add(c1);
		listComp.add(c2);
		listComp.add(c3);
		listComp.add(c4);
		listComp.add(c5);
		listComp.add(c6);
		listComp.add(c7);
		listComp.add(c8);
		Pool pool = new Pool(listComp,new BasicMatch(), selection);
		try {
			pool.makePools(listComp);
		}
		catch (LackOfCompetitors e) {
			System.out.println("You need atleast six competitors to start a Master competition.");
		}
		
		ArrayList<Competitor> finalPhase = selection.makeFinalPhase(pool.getPoolList());
		assertTrue(finalPhase.contains(c1));
		assertTrue(finalPhase.contains(c2));
		assertTrue(finalPhase.contains(c3));
		assertTrue(finalPhase.contains(c4));
		assertTrue(finalPhase.contains(c5));
		assertTrue(finalPhase.contains(c6));
		assertTrue(finalPhase.contains(c7));
		assertTrue(finalPhase.contains(c8));
		
	}
	
	 public static junit.framework.Test suite() {
			return new junit.framework.JUnit4TestAdapter(competitionpack.SecondStrategyTest.class);
	}
}