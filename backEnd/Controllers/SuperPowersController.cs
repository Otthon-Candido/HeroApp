using Microsoft.AspNetCore.Mvc;
using SuperHeroApp.Business.Interfaces;

namespace SuperHeroApp.Controllers;

[ApiController]
[Route("[controller]")]
public class SuperPowersController : ControllerBase
{
    private readonly ISuperPowersBusiness _business;
    public SuperPowersController(ISuperPowersBusiness superPowerBusiness)
    {
        _business = superPowerBusiness;
    }

    [HttpGet("GetSuperPowers")]
  
    public   IActionResult GetSuperPowers()
    {
        return Ok(_business.GetTable());
    }

    [HttpGet("GetSuperPower/{id}")]
  
    public   IActionResult GetSuperPowersById(int id)
    {
        return Ok(_business.GetSuperPowersById(id));
    }

    [HttpPost("SaveSuperPower")]
    public IActionResult SaveSuperPower([FromBody] SuperPowers vo)
    {
        return Ok(_business.SaveSuperPower(vo));

    }

    [HttpPut("UpdateSuperPower")]
    public IActionResult  UpdateHero([FromBody] SuperPowers vo)
    {
        return Ok(_business.UpdateSuperPower(vo));

    }


    [HttpDelete("DeleteSuperPower/{id}")]
    public IActionResult DeleteSuperPower(int id)
    {
        return Ok(_business.DeleteSuperPower(id));

    }


    

}
