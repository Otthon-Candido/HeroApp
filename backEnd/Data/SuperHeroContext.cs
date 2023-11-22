
using Microsoft.EntityFrameworkCore;
using parafusoInteligente.Infra.Entities;
using SuperHeroApp.Models;

namespace SuperHeroApp.Data{

    public class SuperHeroAppContext : DbContext{
    private IConfiguration _configuration;
        public SuperHeroAppContext(DbContextOptions<SuperHeroAppContext> opts)
        : base(opts)
        {

             
            
        }

          protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("SuperHeroConnection"));
            }
        }

        public DbSet<HeroesEntity> Heroes {get; set;}

        public DbSet<SuperPowersEntity> SuperPowers {get; set;}

        public DbSet<HeroesSuperPowerEntity> HeroesSuperPower {get; set;}

    }

}