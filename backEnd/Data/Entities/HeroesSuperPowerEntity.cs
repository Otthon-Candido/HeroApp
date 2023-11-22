using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SuperHeroApp.Models;

namespace parafusoInteligente.Infra.Entities
{
    [Table("T_SUPER_POWER_HEROES")]
    public class HeroesSuperPowerEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(name: "ID_HEROES")]
        public int IdHeroes { get; set; }

        [Required]
        [Column(name: "ID_SUPER_POWER")]
        public int IdSuperPower { get; set; }

        [ForeignKey("IdHeroes")]
        public HeroesEntity Heroes { get; set; }

        [ForeignKey("IdSuperPower")]
        public SuperPowersEntity SuperPowers { get; set; }
    }
}