﻿using HwProj.Repositories;
using System;

namespace HwProj.CourseWorkService.API.Models
{
    public class Application : IEntity
    {
        public long Id { get; set; }

        public string Message { get; set; }
        public DateTime DateOfApplication { get; set; }

        public long StudentId { get; set; }
        public User Student { get; set; }

        public long CourseWorkId { get; set; }
        public CourseWork CourseWork { get; set; }
    }
}
