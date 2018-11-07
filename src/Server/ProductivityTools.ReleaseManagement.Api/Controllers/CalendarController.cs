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
            var result = new Calendar() { Start = DateTime.Now.AddMonths(-2), End = DateTime.Now.AddMonths(1) };
            result.Schedules = new List<ApiModels.Schedule>();
            var release102 = new Schedule() { Id=1, Name = "Release 10.2", Start =DateTime.Parse("2018.10.10"), End = DateTime.Parse("2018.12.06") };
            var release102QAonReleaseCandidate= new Schedule() { Id = 2, Name = "QA - Release Candidate", Start = DateTime.Parse("2018.11.22"), End = DateTime.Parse("2018.12.28") };
            release102.Schedules.Add(release102QAonReleaseCandidate);

            var release102QAonReleaseGated = new Schedule() { Id = 2, Name = "QA - Release Gated", Start = DateTime.Parse("2018.11.29"), End = DateTime.Parse("2018.12.04") };
            release102.Schedules.Add(release102QAonReleaseGated);


            var s2 = new Schedule() { Id = 2, Name = "Release2", Start = DateTime.Now.AddDays(-19), End = DateTime.Now.AddDays(-10) };
            var s3 = new Schedule() { Id = 3, Name = "Release3", Start = DateTime.Now.AddDays(-18), End = DateTime.Now.AddDays(-10) };
            var s4 = new Schedule() { Id = 4, Name = "Release4", Start = DateTime.Now.AddDays(-17), End = DateTime.Now.AddDays(-10) };
            var s5 = new Schedule() { Id = 5, Name = "Release5", Start = DateTime.Now.AddDays(-16), End = DateTime.Now.AddDays(-10) };
            var s6 = new Schedule() { Id = 6, Name = "Release6", Start = DateTime.Now.AddDays(-15), End = DateTime.Now.AddDays(-10) };
            var s7 = new Schedule() { Id = 7, Name = "Release7", Start = DateTime.Now.AddDays(-14), End = DateTime.Now.AddDays(-10) };


            result.Schedules.Add(release102);
            //result.Schedules.Add(s2);
            //result.Schedules.Add(s3);
            //result.Schedules.Add(s4);
            //result.Schedules.Add(s5);
            //result.Schedules.Add(s6);
            //result.Schedules.Add(s7);
            ///result.Schedules.Add(new Schedule() { Name = "Release2", Start = DateTime.Now.AddDays(-7), End = DateTime.Now.AddDays(-2) });

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
