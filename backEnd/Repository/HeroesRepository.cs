

using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using parafusoInteligente.Infra.Entities;
using SuperHeroApp.Data;
using SuperHeroApp.Models;
using SuperHeroApp.Repository.Interfaces;
using Transcom.Infra.Exceptions;

namespace SuperHeroApp.Business
{

    public class HeroesRepository : IHeroesRepository
    {
        private readonly IMapper _mapper;
        private readonly SuperHeroAppContext _context;
        public HeroesRepository(IMapper mapper, SuperHeroAppContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public HeroesTable GetTable()
        {

            var heroesEntity = _context.Heroes.Include(e => e.HeroesSuperPower).ThenInclude(s => s.SuperPowers);

            var heroes = heroesEntity.Select(t => new Heroes
            {
                Id = t.Id,
                BirthDate = t.BirthDate,
                HeroHeight = t.HeroHeight,
                HeroName = t.HeroName,
                Name = t.Name,
                HeroWeight = t.HeroWeight,
                HeroesSuperPower = t.HeroesSuperPower.Select(p => new SuperPowers
                {
                    Id = p.SuperPowers.Id,
                    Description = p.SuperPowers.Description,
                    SuperPower = p.SuperPowers.SuperPower
                }).ToList()


            }).ToList();

            var heroesTable = new HeroesTable()
            {
                DataList = heroes,

            };

            return heroesTable;

        }

        private bool VerifyExistHero(Heroes vo)
        {
            if (_context.Heroes.Any(h => h.HeroName.ToLower() == vo.HeroName.ToLower() &&
                h.Id != vo.Id))
            {
                return true;
            }

            return false;
        }

        public Heroes SaveHero(Heroes vo)
        {

            if (VerifyExistHero( vo))
            {
                throw new BadRequestException("Nome do heroi não pode repetir");
            }

            var HeroEntity = new HeroesEntity()
            {
                Name = vo.Name,
                BirthDate = vo.BirthDate.ToUniversalTime(),
                HeroHeight = vo.HeroHeight,
                HeroName = vo.HeroName,
                HeroWeight = vo.HeroHeight,
            };


            _context.Heroes.Add(HeroEntity);
            _context.SaveChanges();
            var hero = _mapper.Map<Heroes>(HeroEntity);

            List<HeroesSuperPowerEntity> heroSupePowerList = new List<HeroesSuperPowerEntity>();
            foreach (SuperPowers superPowers in vo.HeroesSuperPower)
            {
                var heroSupePower = new HeroesSuperPowerEntity();
                heroSupePower = new HeroesSuperPowerEntity()
                {

                    IdHeroes = hero.Id,
                    IdSuperPower = superPowers.Id
                };

                heroSupePowerList.Add(heroSupePower);

            }

            _context.HeroesSuperPower.AddRange(heroSupePowerList);
            _context.SaveChanges();

            return hero;

        }

        public Heroes UpdateHero(Heroes vo)
        {

            if (VerifyExistHero(vo))
            {
                throw new BadRequestException("Nome do heroi não pode repetir");
            }

            var HeroEntity = new HeroesEntity()
            {
                Id = vo.Id,
                Name = vo.Name,
                BirthDate = vo.BirthDate.ToUniversalTime(),
                HeroHeight = vo.HeroHeight,
                HeroName = vo.HeroName,
                HeroWeight = vo.HeroWeight,
            };
            _context.Heroes.Update(HeroEntity);
            _context.SaveChanges();
            var hero = _mapper.Map<Heroes>(HeroEntity);

            var oldAssociations = _context.HeroesSuperPower
                .Where(hsp => hsp.IdHeroes == vo.Id)
                .ToList();

            var associationsToRemove = oldAssociations
                .Where(hsp => !vo.HeroesSuperPower.Any(sp => sp.Id == hsp.IdSuperPower))
                .ToList();


            _context.HeroesSuperPower.RemoveRange(associationsToRemove);

            var superPowersAssociations = oldAssociations.Select(hsp => hsp.IdSuperPower).ToList();
            var newAssociations = vo.HeroesSuperPower
                .Where(sp => !superPowersAssociations.Contains(sp.Id))
                .Select(superPowers => new HeroesSuperPowerEntity
                {
                    IdHeroes = vo.Id,
                    IdSuperPower = superPowers.Id
                })
                .ToList();
            _context.HeroesSuperPower.UpdateRange(newAssociations);
            _context.SaveChanges();

            return hero;

        }

        public Heroes DeleteHero(int id)
        {

            var heroEntity = _context.Heroes.Where(p => p.Id == id).FirstOrDefault();

            if (heroEntity != null)
            {
                _context.Heroes.Remove(heroEntity);
                _context.SaveChanges();
                var superPower = _mapper.Map<Heroes>(heroEntity);
                return superPower;
            }
            else
            {
                throw new BadRequestException("Erro ao excluir heroi");
            }

        }

        public Heroes GetHeroById(int id)
        {
            var heroesEntity = _context.Heroes.Include(e => e.HeroesSuperPower).ThenInclude(s => s.SuperPowers).Where(t => t.Id == id);

            var heroes = heroesEntity.Select(t => new Heroes
            {
                Id = t.Id,
                BirthDate = t.BirthDate,
                HeroHeight = t.HeroHeight,
                HeroName = t.HeroName,
                Name = t.Name,
                HeroWeight = t.HeroWeight,
                HeroesSuperPower = t.HeroesSuperPower.Select(p => new SuperPowers
                {
                    Id = p.SuperPowers.Id,
                    Description = p.SuperPowers.Description,
                    SuperPower = p.SuperPowers.SuperPower
                }).ToList()


            }).FirstOrDefault() ?? throw new BadRequestException("Erro ao encontrar heroi");
            return heroes;
        }
    }
}