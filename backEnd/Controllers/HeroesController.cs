using Microsoft.AspNetCore.Mvc;
using SuperHeroApp.Business.Interfaces;

namespace SuperHeroApp.Controllers;

[ApiController]
[Route("[controller]")]
public class HeroesController : ControllerBase
{
    private readonly IHeroesBusiness _business;
    public HeroesController(IHeroesBusiness heroesBusiness)
    {
        _business = heroesBusiness;
    }

    [HttpGet("GetHeroes")]
    public IActionResult Get()
    {
        return Ok(_business.GetTable());

    }

    [HttpGet("GetHero/{id}")]
  
    public   IActionResult GetHeroById(int id)
    {
        return Ok(_business.GetHeroById(id));
    }

    [HttpPost("SaveHero")]
    public IActionResult Save([FromBody] Heroes vo)
    {
        return Ok(_business.SaveHero(vo));

    }


    [HttpPut("UpdateHero")]
    public Heroes UpdateHero([FromBody] Heroes vo)
    {
        return _business.UpdateHero(vo);

    }

    [HttpDelete("DeleteHero/{id}")]
    public Heroes DeleteHero(int id)
    {
        return _business.DeleteHero(id);

    }

}
