namespace SuperHeroApp;

public class Heroes
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string HeroName { get; set; }
    public DateTime BirthDate { get; set; }
    public string HeroHeight { get; set; }
    public string HeroWeight { get; set; }
    public List<SuperPowers> HeroesSuperPower { get; set; }
    
}
