using AutoMapper;
using SuperHeroApp;
using SuperHeroApp.Models;

namespace Transcom.Infra.Mapper
{
    public class DefaultMapper : Profile
    {
        public DefaultMapper()
        {

              CreateMap<HeroesEntity, Heroes>()
                .ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

             CreateMap<SuperPowersEntity, SuperPowers>()
                .ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        
        }
    }
}