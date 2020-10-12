package competitionpack;

import java.util.*;

public class Main{
    public static void main(String[] args) {
    	/* Creation a list of competitor for a league */
    	Competitor c1 = new Competitor("Meliodas");
        Competitor c2 = new Competitor("Gelda");
        Competitor c3 = new Competitor("Elizabeth");
        Competitor c4 = new Competitor("Diane");
        Competitor c5 = new Competitor("Ban");
        ArrayList<Competitor> leagueCompetitors = new ArrayList<Competitor>();
        leagueCompetitors.add(c1);
        leagueCompetitors.add(c2);
        leagueCompetitors.add(c3);
        leagueCompetitors.add(c4);
        leagueCompetitors.add(c5);

        
        /* Creation a list of competitor for a tournament */
        Competitor x1 = new Competitor("King");
        Competitor x2 = new Competitor("Gowther");
        Competitor x3 = new Competitor("Merline");
        Competitor x4 = new Competitor("Hawk");
        Competitor x5 = new Competitor("Elaine");
        Competitor x6 = new Competitor("Geera");
        Competitor x7 = new Competitor("Zeldris");
        Competitor x8 = new Competitor("Oslo");
        ArrayList<Competitor> tounarmentCompetitors = new ArrayList<Competitor>();
        tounarmentCompetitors.add(x1);
        tounarmentCompetitors.add(x2);
        tounarmentCompetitors.add(x3);
        tounarmentCompetitors.add(x4);
        tounarmentCompetitors.add(x5);
        tounarmentCompetitors.add(x6);
        tounarmentCompetitors.add(x7);
        tounarmentCompetitors.add(x8);


        /* creating the league and tournament */
        Match matchType = new BasicMatch();
        League league = new League (leagueCompetitors,matchType);
        Tournament tournament = new Tournament (tounarmentCompetitors,matchType);

        System.out.println("\n<<<<<< League >>>>>>");
        /* starting the league */
        league.play();
        
        /* final results of the league */
        Map<Competitor,Integer> leagueResult = league.ranking();
        System.out.println("\n*** Ranking ***");
        for (Map.Entry<Competitor,Integer> entry : leagueResult.entrySet())  
            System.out.println(entry.getKey().toString()); 
        System.out.println("\n<<<<<< Tournament >>>>>>");
        /* starting the tournament */
        tournament.play();
        
        /* final results of the tournament */
        Map<Competitor,Integer> tournamentResult = tournament.ranking();
        System.out.println("\n*** Ranking ***");
        for (Map.Entry<Competitor,Integer> entry : tournamentResult.entrySet())  
            System.out.println(entry.getKey().toString());
    
    }

}
