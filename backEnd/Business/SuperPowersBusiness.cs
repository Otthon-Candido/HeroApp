

using SuperHeroApp.Business.Interfaces;
using SuperHeroApp.Repository.Interfaces;

namespace SuperHeroApp.Business
{
    public class SuperPowersBusiness : ISuperPowersBusiness
    {
        private readonly ISuperPowerRespository _repository;
        public SuperPowersBusiness(ISuperPowerRespository heroesRepository) 
        {

            _repository = heroesRepository;
        }

        public SuperPowers DeleteSuperPower(int id)
        {
            return _repository.DeleteSuperPower(id);
        }

        public SuperPowers GetSuperPowersById(int id)
        {
               return _repository.GetSuperPowersById(id);
        }

        public SuperPowersTable GetTable()
        {
           return _repository.GetTable();
        }

        public SuperPowers SaveSuperPower(SuperPowers vo)
        {
          return _repository.SaveSuperPower(vo);
        }

           public SuperPowers UpdateSuperPower(SuperPowers vo)
        {
           return _repository.UpdateSuperPower(vo);
            
        }
    }
}