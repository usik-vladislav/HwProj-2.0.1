﻿using System.Threading.Tasks;
using HwProj.CoursesService.API.Models;
using HwProj.CoursesService.API.Models.DTO;

namespace HwProj.CoursesService.API.Services
{
    public interface IGroupsService
    {
        Task<Group[]> GetAllAsync(long courseId);
        Task<Group> GetGroupAsync(long groupId);
        Task<long> AddGroupAsync(Group group, long courseId);
        Task DeleteGroupAsync(long id);
        Task UpdateAsync(long courseId, Group updated);
        Task<bool> AddCourseMateInGroupAsync(long groupId, string studentId);
        Task<bool> DeleteCourseMateFromGroupAsync(long groupId, string studentId);
        Task<UserGroupDescription[]> GetCourseMateGroupsAsync(long courseId, string studentId);
    }
}
