

using AutoMapper;
using SuperHeroApp.Data;
using SuperHeroApp.Models;
using SuperHeroApp.Repository.Interfaces;
using Transcom.Infra.Exceptions;

namespace SuperHeroApp.Business
{

    public class SuperPowerRespository : ISuperPowerRespository
    {
        private readonly IMapper _mapper;
        private readonly SuperHeroAppContext _context;
        public SuperPowerRespository(IMapper mapper, SuperHeroAppContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public SuperPowersTable GetTable()
        {

            var superPowerEntity = _context.SuperPowers.OrderByDescending(b => b.Id);



            var superPowers = superPowerEntity.Select(t => new SuperPowers
            {
                Id = t.Id,
                Description = t.Description,
                SuperPower = t.SuperPower
            }).ToList();

            var superPowersTable = new SuperPowersTable()
            {
                DataList = superPowers,

            };

            return superPowersTable;
        }



        public SuperPowers SaveSuperPower(SuperPowers vo)
        {

            if (_context.SuperPowers.Any(sp => sp.SuperPower.ToLower() == vo.SuperPower.ToLower()))
            {
                // Se já existe, você pode tomar alguma ação, lançar uma exceção, retornar null, etc.
                // Por exemplo, você pode lançar uma exceção indicando que o superpoder já existe.
                throw new BadRequestException("Super poderes repetidos");
            }

            var SuperPowerEntity = new SuperPowersEntity()
            {
                Description = vo.Description,
                SuperPower = vo.SuperPower

            };

            _context.SuperPowers.Add(SuperPowerEntity);
            _context.SaveChanges();

            return _mapper.Map<SuperPowers>(SuperPowerEntity);
        }


        public SuperPowers UpdateSuperPower(SuperPowers vo)
        {

            if (_context.SuperPowers.Any(sp => sp.SuperPower.ToLower() == vo.SuperPower.ToLower()&&
                sp.Id != vo.Id))
            {
                // Se já existe, você pode tomar alguma ação, lançar uma exceção, retornar null, etc.
                // Por exemplo, você pode lançar uma exceção indicando que o superpoder já existe.
                throw new BadRequestException("Super poderes repetidos");
            }

            var superPowerEntity = new SuperPowersEntity()
            {
                Id = vo.Id,
                Description = vo.Description,
                SuperPower = vo.SuperPower
            };


            _context.SuperPowers.Update(superPowerEntity);
            _context.SaveChanges();
            var superPower = _mapper.Map<SuperPowers>(superPowerEntity);


            return superPower;
        }


        public SuperPowers DeleteSuperPower(int id)
        {

            var superPowerEntity = _context.SuperPowers.Where(p => p.Id == id).FirstOrDefault();

            if (superPowerEntity != null)
            {
                _context.SuperPowers.Remove(superPowerEntity);
                _context.SaveChanges();
                var superPower = _mapper.Map<SuperPowers>(superPowerEntity);
                return superPower;
            }
            else
            {
                throw new BadRequestException("Identificador Não encontrado");
            }

        }

        public SuperPowers GetSuperPowersById(int id)
        {
            var superPowerEntity = _context.SuperPowers.Where(p => p.Id == id).FirstOrDefault();
            var superPower = _mapper.Map<SuperPowers>(superPowerEntity);
            return superPower;
        }
    }
}