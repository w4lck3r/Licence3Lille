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
        ArrayList<Competitor> tournamentCompetitors = new ArrayList<Competitor>();
        tournamentCompetitors.add(x1);
        tournamentCompetitors.add(x2);
        tournamentCompetitors.add(x3);
        tournamentCompetitors.add(x4);
        tournamentCompetitors.add(x5);
        tournamentCompetitors.add(x6);
        tournamentCompetitors.add(x7);
        tournamentCompetitors.add(x8);


        /* creating the league and tournament */
        Match matchType = new BasicMatch();
        League league = new League (leagueCompetitors,matchType);
        Tournament tournament = new Tournament (tournamentCompetitors,matchType);

        System.out.println("\n<<<<<< League >>>>>>");
        /* starting the league */
        league.play();
        
        /* final results of the league */
        Map<Competitor,Integer> leagueResult = league.ranking();
        System.out.println("\n*** Ranking ***");
        for (Map.Entry<Competitor,Integer> entry : leagueResult.entrySet())  
            System.out.println(entry.getKey().toString2()); 
        System.out.println("\n<<<<<< Tournament >>>>>>");
        /* starting the tournament */
        tournament.play();
        
        /* final results of the tournament */
        Map<Competitor,Integer> tournamentResult = tournament.ranking();
        System.out.println("\n*** Ranking ***");
        for (Map.Entry<Competitor,Integer> entry : tournamentResult.entrySet())  
            System.out.println(entry.getKey().toString2());
        
        
        /* Creation a list of competitor for a Master */
        Competitor a1 = new Competitor("Yassine1");
        Competitor a2 = new Competitor("Yassine2");
        Competitor a3 = new Competitor("Yassine3");
        Competitor a4 = new Competitor("Yassine4");
        Competitor a5 = new Competitor("Yassine5");
        Competitor a6 = new Competitor("Yassine6");
        Competitor a7 = new Competitor("Yassine7");
        Competitor a8 = new Competitor("Yassine8");
        Competitor a9 = new Competitor("Yassine9");
        Competitor a10 = new Competitor("Yassine10");
        Competitor a11 = new Competitor("Yassine11");
        Competitor a12 = new Competitor("Yassine12");
        
        ArrayList<Competitor> masterCompetitors = new ArrayList<Competitor>();
        masterCompetitors.add(a1);
        masterCompetitors.add(a2);
        masterCompetitors.add(a3);
        masterCompetitors.add(a4);
        masterCompetitors.add(a5);
        masterCompetitors.add(a6);
        masterCompetitors.add(a7);
        masterCompetitors.add(a8);
        masterCompetitors.add(a9);
        masterCompetitors.add(a10);
        masterCompetitors.add(a11);
        masterCompetitors.add(a12);
        
        /* Creating a master and a */
        Master master = new Master(masterCompetitors,matchType,new FirstStrategy());
        Pool pool = new Pool(masterCompetitors,matchType,new FirstStrategy());
        try {
        	pool.playPoolPhase(masterCompetitors);
        }
        catch(LackOfCompetitors e){
        	System.out.println("You need atleast six competitors to start a Master competition.");
        }
        master.getSelection().makeFinalPhase(pool.getPoolList());      
        master.play();        
    }
}
