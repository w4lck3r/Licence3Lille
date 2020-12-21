package competitionpack;

import java.util.*;

public class Journalist implements CompListener {

    /**
     * @param c Competition
     */
	@Override
	public void competitionEvent(Competition c) {
		c.journalistCommentary();
	}

    /**
     * change the amount of competitor's cote
     * @param c a Competitor 
     * @param cote cote needed
     */
    public void putCoteOnCompetitor(Competitor c, int cote) {
        c.setCote(cote);
    }

	
}