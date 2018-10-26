using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityTools.ReleaseManagement.ApiModels
{
    public class Schedule
    {
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public List<Event> Events { get; set; }
    }
}
