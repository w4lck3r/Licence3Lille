package competitionpack;

public class Competitor{
  private final String name;
  private int cote;
  private int score;


  /* Constructor */
  public Competitor (String name){
	this.score = 0;
	this.cote = 0;
	this.name = name;

  }
  
  /**
   * add one score to the competitor.
   */
  public void addScore() {
	  this.score += 1;
  }
  
  /**
   * add one cote to the competitor.
   */
  public void plusCote(){
	  this.cote += 1;
  }
 
  /**
   * reduce one cote to the competitor.
   */
  public void minusCote(){
	  this.cote -= 1;
  }
  
  /**
   * set the cote of the competitor
   * @param cote the cote given to the competitor.
   */
  public void setCote(int c){
	  this.cote = c;
  }
  

  /******** getters *********/
  
  /**
   * returns the name of a Competitor
   * @return the name of a Competitor
   */
  public String getName(){
	  return this.name;
  }
  
  /**
   * returns the number of points of a Competitor
   * @return the number of points of a Competitor
   */
  public int getScore(){
    return this.score;
  }
  
  /**
   * returns the cote of the competitor
   * @return returns the cote of the competitor
   */
  public int getCote(){
	  return this.cote;
  }

  public String toString2 () {
	    return (this.name+" - "+"Points : "+this.score+" - "+"Cote : "+this.cote);
	  }
/*
  public String toString2(){
    return (this.name +" > "+ this.score);
  }
  public String toString3() {
	  return (this.name);
  }
  */
  /**
   * two Competitors are "equals" if they have the same name and the same number of points
   * @param o a Competitor to compare of another (this)
   * @return true if they are equals, otherwize false
	 */
	public boolean equals(Object o){
		if (o instanceof Competitor){
			Competitor other = (Competitor) o;
			return this.name.equals(other.name) && this.score == other.score;
			
		}
		
		else {
			return false;
		}
	}

}
