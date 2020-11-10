﻿using System.Threading.Tasks;
using HwProj.CourseWorkService.API.Events;
using HwProj.CourseWorkService.API.Models.UserInfo;
using HwProj.CourseWorkService.API.Repositories.Interfaces;
using HwProj.EventBus.Client.Interfaces;

namespace HwProj.CourseWorkService.API.EventHandlers
{
    public class InviteLecturerEventHandler : IEventHandler<InviteLecturerEvent>
    {
        private readonly IUsersRepository _usersRepository;

        public InviteLecturerEventHandler(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task HandleAsync(InviteLecturerEvent @event)
        {
            await _usersRepository.AddRoleToUserAsync(@event.UserId, RoleTypes.Lecturer).ConfigureAwait(false);
            await _usersRepository.RemoveRoleFromUserAsync(@event.UserId, RoleTypes.Student).ConfigureAwait(false);
        }
    }
}
