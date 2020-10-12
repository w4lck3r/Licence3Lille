package competitionpack;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class CompetitorTest{
    private Competitor compTest;

	@Before
	public void before() {
		this.compTest = new Competitor("compTest");
	}


	@Test
	public void createCompetitorTest(){
        assertNotNull(this.compTest);
	}
	
	@Test
	public void getNameTest(){
		assertEquals(this.compTest.getName(),"compTest");
	}

	@Test
	public void addAndGetScoreTest(){
        assertEquals(this.compTest.getScore(),0);
        this.compTest.addScore();
        assertEquals(this.compTest.getScore(),1);
	}
	

    public static junit.framework.Test suite() {
	return new junit.framework.JUnit4TestAdapter(competitionpack.CompetitorTest.class);
    }

}
