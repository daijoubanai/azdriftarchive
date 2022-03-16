using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ImageServer.Models;
using System.Linq;
using System.IO;

namespace ImageServer.Controllers
{
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        [Route("api/GetEventsByYear")]
        [HttpGet]
        public async Task<ActionResult<List<Events>>> GetEventsByYear(int eventYear)
        {
            var events = await _context.Events.Where(x => x.date.Year == eventYear).ToListAsync();
            var eventsDto = from y in events
                            select new EventsDto
                            {
                                location = y.location,
                                path = y.path
                            };

            return Ok(eventsDto);
        }

        [Route("api/GetDataFromEvent")]
        [HttpGet]
        public async Task<ActionResult<List<Events>>> GetDataFromEvent(string eventDate)
        {
            string targetDirectory = ("wwwroot/Media/" + eventDate);
            string[] files = Directory.GetFiles(targetDirectory);

            return Ok(files);
        }

    }
}
