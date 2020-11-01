﻿using System.ComponentModel.DataAnnotations;
using HwProj.Repositories;

namespace HwProj.CourseWorkService.API.Models
{
    public class LecturerProfile : IEntity<string>
    {
        public string Id { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public long? DepartmentId { get; set; }
        public Department Department { get; set; }

        public string Contact { get; set; }
    }
}
