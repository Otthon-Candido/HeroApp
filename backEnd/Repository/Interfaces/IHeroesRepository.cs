
using SuperHeroApp;

namespace SuperHeroApp.Repository.Interfaces
{
    public interface IHeroesRepository
    {
        public Heroes GetHeroById(int id);
        public HeroesTable GetTable();

        public Heroes SaveHero(Heroes vo);

        public Heroes UpdateHero(Heroes vo);

        public  Heroes  DeleteHero(int id);
    }
}