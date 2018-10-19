using System;
using System.Collections.Generic;

namespace ProductivityTools.ReleaseManagement.ApiModels
{
    public class Calendar
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        List<Release> Releases { get;set; }
    }
}
