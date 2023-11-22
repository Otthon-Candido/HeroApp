using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using parafusoInteligente.Infra.Entities;

namespace SuperHeroApp.Models;
[Table("T_SUPER_POWER")]
public class SuperPowersEntity
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [Column(name: "SUPER_POWER")]
    public string SuperPower { get; set; }

    [Required]
    [Column(name: "DESCRIPTION")]
    public string Description { get; set; }

    public List<HeroesSuperPowerEntity> HeroesSuperPower { get; set; }


}
