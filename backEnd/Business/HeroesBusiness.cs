

using SuperHeroApp.Business.Interfaces;
using SuperHeroApp.Repository.Interfaces;

namespace SuperHeroApp.Business
{
   public class HeroesBusiness : IHeroesBusiness
   {
      private readonly IHeroesRepository _repository;
      public HeroesBusiness(IHeroesRepository heroesRepository)
      {

         _repository = heroesRepository;
      }


      public Heroes GetHeroById(int id)
      {
         return _repository.GetHeroById(id);
      }
      public HeroesTable GetTable()
      {
         return _repository.GetTable();

      }

      public Heroes SaveHero(Heroes vo)
      {
         return _repository.SaveHero(vo);

      }

      public Heroes UpdateHero(Heroes vo)
      {
         return _repository.UpdateHero(vo);

      }

      public Heroes DeleteHero(int id)
      {
         return _repository.DeleteHero(id);
      }
   }
}