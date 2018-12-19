﻿using HwProj.AuthService.API.Models;
using HwProj.AuthService.API.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HwProj.AuthService.API.Services
{
    public interface IUserService
    {
        Task<User> Get(string Email);

        Task<string> Register(RegisterViewModel model, HttpContext httpContext, IUrlHelper url);

        Task Edit(EditViewModel model, ClaimsPrincipal User);

        Task ConfirmEmail(string userId, string code);

        Task Login(LoginViewModel model);

        Task<string> RequestToChangeEmail(
            ChangeEmailViewModel model,
            ClaimsPrincipal User,
            HttpContext httpContext,
            IUrlHelper url);

        Task ConfirmChangeEmail(string userId, string email, string code);

        Task Delete(DeleteViewModel model, ClaimsPrincipal User);

        Task ChangePassword(ChangePasswordViewModel model, ClaimsPrincipal User, HttpContext httpContext);

        Task InviteNewLecturer(InviteLecturerViewModel model, ClaimsPrincipal User);

        Task LogOff();
    }
}