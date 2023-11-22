
using SuperHeroApp;

namespace SuperHeroApp.Repository.Interfaces
{
    public interface ISuperPowerRespository
    {
        public SuperPowers GetSuperPowersById(int id);
        public SuperPowersTable GetTable();

        public SuperPowers SaveSuperPower(SuperPowers vo);

        public SuperPowers UpdateSuperPower(SuperPowers vo);

        public  SuperPowers  DeleteSuperPower(int id);
    }
}