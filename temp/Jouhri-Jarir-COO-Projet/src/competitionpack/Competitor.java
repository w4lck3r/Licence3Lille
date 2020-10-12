package competitionpack;

public class Competitor{
  private final String name;
  private int score;

  /* Constructor */
  public Competitor (String name){
	this.score = 0;
	this.name = name;
  }

  /**
   * add one score to a competitor
   */
  public void addScore(){
    this.score += 1;
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


  public String toString(){
    return (this.name +" > "+ this.score);
  }

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
