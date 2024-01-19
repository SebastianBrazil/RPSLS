using Microsoft.AspNetCore.Mvc;
using RPSLS.Services.rpslsRandomGen;

namespace RPSLS.Controllers;

[ApiController]
[Route("[controller]")]
public class rpslsRandomGenController : ControllerBase
{
    private readonly IrpslsRandomGenService _rpslsRandomGenService;

    public rpslsRandomGenController(IrpslsRandomGenService rpslsRandomGenService)
    {
        _rpslsRandomGenService = rpslsRandomGenService;
    }

    [HttpGet]
    [Route("Response")]
    public string ResponseRNG()
    {
        return _rpslsRandomGenService.ResponseRNG();
    }
}
