package competitionpack;
import java.util.*;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class PoolTest {
	
	private Pool pool;
	private ArrayList<Competitor> pieceTest= new ArrayList<Competitor>();
	private ArrayList<Competitor> listComp= new ArrayList<Competitor>();
	
	@Before
	public void starter() {
		Competitor c1 = new Competitor("c1");
		Competitor c2 = new Competitor("c2");
		Competitor c3 = new Competitor("c3");
		Competitor c4 = new Competitor("c4");
		Competitor c5 = new Competitor("c5");
		Competitor c6 = new Competitor("c6");
		listComp.add(c1);
		listComp.add(c2);
		listComp.add(c3);
		listComp.add(c4);
		listComp.add(c5);
		listComp.add(c6);
		pool = new Pool(listComp , new BasicMatch() , new FirstStrategy());	
		pieceTest.add(c1);
		pieceTest.add(c2);
		pieceTest.add(c3);
	}
	
	@Test
	public void constructorTest() {
		assertNotNull(pool);
	}
	
	@Test
	public void pieceOfCompetitorsTest() {
		assertEquals(pool.pieceOfCompetitors(listComp, 0, 3),pieceTest);
		
	}
	
	@Test(expected=LackOfCompetitors.class)
	public void makePoolFailedTest() throws LackOfCompetitors{
		pool.makePools(pieceTest);
	}
	
	@Test
	public void makePoolTest() {
		try {
			pool.makePools(listComp);
			assertNotNull(pool.getPoolList());
		}
		catch (LackOfCompetitors e) {
			fail();
		}
  	}
	
	public static junit.framework.Test suite() {
		return new junit.framework.JUnit4TestAdapter(competitionpack.PoolTest.class);
	}
}
