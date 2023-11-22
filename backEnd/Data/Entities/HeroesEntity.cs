using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using parafusoInteligente.Infra.Entities;

namespace SuperHeroApp.Models;
[Table("T_HEROES")]
public class HeroesEntity
{

    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [Column(name: "NAME")]
    public string Name { get; set; }

    [Required]
    [Column(name: "HERO_NAME")]
    public string HeroName { get; set; }

    [Required]
    [Column(name: "BIRTH_DATE")]
    public DateTime BirthDate { get; set; }

    [Required]
    [Column(name: "HERO_HEIGHT")]
    public string HeroHeight { get; set; }

    [Required]
    [Column(name: "HERO_WEIGHT")]
    public string HeroWeight { get; set; }

    public List<HeroesSuperPowerEntity> HeroesSuperPower { get; set; }

}
