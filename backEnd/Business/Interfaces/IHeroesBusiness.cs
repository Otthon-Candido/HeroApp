
using SuperHeroApp;

namespace SuperHeroApp.Business.Interfaces
{
    public interface IHeroesBusiness
    {
        public Heroes GetHeroById(int id);
        public HeroesTable GetTable();

        public Heroes SaveHero(Heroes vo);

         public Heroes UpdateHero(Heroes vo);

        public  Heroes  DeleteHero(int id);
    }
}