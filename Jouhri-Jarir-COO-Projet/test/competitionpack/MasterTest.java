package competitionpack;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;

import org.junit.Test;

public class MasterTest {

	@Test
	public void TestCreation() {
		
		ArrayList<Competitor> listComp= new ArrayList<Competitor>();
		Competitor c1 = new Competitor("c5");
		Competitor c2 = new Competitor("c6");
		listComp.add(c1);
		listComp.add(c2);
		Master master = new Master(listComp,new BasicMatch(),new FirstStrategy());
		assertNotNull(master);
	}
	
	 public static junit.framework.Test suite() {
			return new junit.framework.JUnit4TestAdapter(competitionpack.MasterTest.class);
	}
}
