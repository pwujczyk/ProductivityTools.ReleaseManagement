using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductivityTools.ReleaseManagement.ApiModels;

namespace ProductivityTools.ReleaseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<Calendar> Get()
        {
            var result = new Calendar() { Start = DateTime.Now.AddMonths(-1), End = DateTime.Now };
            result.Schedules = new List<ApiModels.Schedule>();
            result.Schedules.Add(new Schedule() { Name = "Release1", Start = DateTime.Now.AddDays(-6), End = DateTime.Now.AddDays(-1) });
            result.Schedules.Add(new Schedule() { Name = "Release2", Start = DateTime.Now.AddDays(-7), End = DateTime.Now.AddDays(-2) });

            //   result.Schedules.Add(new Schedule() { Start = DateTime.Now.AddDays(-500), End = DateTime.Now.AddDays(-400) });
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
