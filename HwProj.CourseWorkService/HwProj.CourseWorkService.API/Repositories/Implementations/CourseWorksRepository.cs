﻿using System.Threading.Tasks;
using HwProj.CourseWorkService.API.Models;
using HwProj.CourseWorkService.API.Repositories.Interfaces;
using HwProj.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HwProj.CourseWorkService.API.Repositories.Implementations
{
    public class CourseWorksRepository : CrudRepository<CourseWork, long>, ICourseWorksRepository
    {
        public CourseWorksRepository(CourseWorkContext context)
           : base(context)
        {
        }

        public async Task<CourseWork> GetCourseWorkAsync(long id)
        {
            return await Context.Set<CourseWork>().Include(c => c.Applications)
                .Include(c => c.Deadlines)
                .Include(c => c.WorkFiles)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
