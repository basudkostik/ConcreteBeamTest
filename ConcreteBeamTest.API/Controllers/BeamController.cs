using ConcreteBeamTest.API.Models;
using ConcreteBeamTest.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConcreteBeamTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeamController : ControllerBase
    {
        private readonly ConcreteCalculator _calculator;

        public BeamController(ConcreteCalculator calculator)
        {
            _calculator = calculator;
        }

        [HttpPost]
        public IActionResult BeamCapacity([FromBody] InputModel input)
        {
            if (input == null)
            {
                return BadRequest("Input data is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = _calculator.CalculateBeamCapacity(input);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error occurred during calculation." });
            }
        }
    }
}
