﻿using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using HwProj.CourseWorkService.API.Models;
using Microsoft.AspNetCore.Mvc;
using HwProj.CourseWorkService.API.Models.DTO;
using HwProj.CourseWorkService.API.Models.ViewModels;
using HwProj.CourseWorkService.API.Services;
using HwProj.Utils.Authorization;

namespace HwProj.CourseWorkService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentCourseWorksController : Controller
    {
        private readonly IApplicationService _applicationService; 
        private readonly ICourseWorkService _courseWorkService;
        private readonly IDeadlineService _deadlineService;
        private readonly IUserService _userService;
        private readonly IWorkFilesService _workFilesService;
        private readonly IMapper _mapper;

        public StudentCourseWorksController(IApplicationService applicationService, ICourseWorkService courseWorkService, 
            IDeadlineService deadlineService, IUserService userService, IWorkFilesService workFilesService, IMapper mapper)
        {
            _applicationService = applicationService;
            _courseWorkService = courseWorkService;
            _deadlineService = deadlineService;
            _userService = userService;
            _workFilesService = workFilesService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(OverviewCourseWork[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAvailableCourseWorks()
        {
            var courseWorks = await _courseWorkService
                .GetFilteredCourseWorksAsync(c => c.StudentId == null)
                .ConfigureAwait(false);
            return Ok(_mapper.Map<OverviewCourseWork[]>(courseWorks));
        }

        [HttpGet("{courseWorkId}")]
        [ProducesResponseType(typeof(DetailCourseWork), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetCourseWorkDetails(long courseWorkId)
        {
            var courseWork = await _courseWorkService.GetCourseWorkAsync(courseWorkId)
                .ConfigureAwait(false);
            if (courseWork == null)
            {
                return NotFound();
            }

            var id = await _userService.GetIdByAuthId(Request.GetUserId()).ConfigureAwait(false);
            Deadline[] deadlines = new Deadline[0];
            if (id == courseWork.StudentId)
            {
                deadlines = await _deadlineService
                    .GetFilteredDeadlinesAsync(d => d.Type == "Work")
                    .ConfigureAwait(false);
            }
            else if (id == courseWork.ReviewerId)
            {
                deadlines = await _deadlineService
                    .GetFilteredDeadlinesAsync(d => d.Type != "Work")
                    .ConfigureAwait(false);
            }
            else if (id == courseWork.LecturerId)
            {
                deadlines = await _deadlineService.GetAllDeadlinesAsync();
            }

            var studentName = "";
            var reviewerName = "";
            if (courseWork.StudentId != null)
            {
                var student = await _userService.GetUserAsync((long)courseWork.StudentId).ConfigureAwait(false);
                studentName = student.Name;
            }
            if (courseWork.ReviewerId != null)
            {
                var reviewer = await _userService.GetUserAsync((long)courseWork.ReviewerId).ConfigureAwait(false);
                reviewerName = reviewer.Name;
            }

            var detailCourseWork = _mapper.Map<DetailCourseWork>(courseWork);
            detailCourseWork.StudentName = studentName;
            detailCourseWork.ReviewerName = reviewerName;
            detailCourseWork.Deadlines = deadlines;
            detailCourseWork.WorkFiles = await _workFilesService
                .GetFilteredWorkFilesAsync(wf => wf.CourseWorkId == courseWorkId)
                .ConfigureAwait(false);
            return Ok(detailCourseWork);
        }

        [HttpGet("student/applications")]
        [ProducesResponseType(typeof(StudentOverviewApplication[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllStudentApplications()
        {
            var studentId = await _userService.GetIdByAuthId(Request.GetUserId()).ConfigureAwait(false);
            var applications = await _applicationService
                .GetFilteredApplicationsAsync(a => a.StudentId == studentId)
                .ConfigureAwait(false);
            return Ok(_mapper.Map<StudentOverviewApplication[]>(applications));
        }

        [HttpPost("apply")]
        [ProducesResponseType(typeof(long), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApplyToCourseWork([FromBody] CreateApplication createApplication)
        {
            var userId = await _userService.GetIdByAuthId(Request.GetUserId()).ConfigureAwait(false);
            var application = _mapper.Map<Application>(createApplication);
            application.DateOfApplication = DateTime.UtcNow;
            application.StudentId = userId;
            application.CourseWork = await _courseWorkService.GetCourseWorkAsync(application.CourseWorkId)
                    .ConfigureAwait(false);
            application.Student = await _userService.GetUserAsync(userId).ConfigureAwait(false);
            var id = await _applicationService.AddApplicationAsync(application).ConfigureAwait(false);
            return Ok(id);
        }

        [HttpPost("cancel/{courseWorkId}")]
        public async Task<IActionResult> CancelApplicationToCourseWork(long courseWorkId)
        {
            var userId = await _userService.GetIdByAuthId(Request.GetUserId()).ConfigureAwait(false);
            await _applicationService.DeleteApplicationAsync(userId, courseWorkId).ConfigureAwait(false);
            return Ok();
        }

        [HttpPost("addFile")]
        [ProducesResponseType(typeof(long), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddFileOrReference([FromBody]AddFileOrReference addFileOrReference)
        {
            var workFile = _mapper.Map<WorkFile>(addFileOrReference);
            workFile.CourseWork = await _courseWorkService.GetCourseWorkAsync(workFile.CourseWorkId)
                .ConfigureAwait(false);
            if (workFile.IsFile)
            {
                workFile.FileName = addFileOrReference.FData.FileName;
                workFile.FileType = addFileOrReference.FData.ContentType;

                using (var binaryReader = new BinaryReader(addFileOrReference.FData.OpenReadStream()))
                {
                    workFile.Data = binaryReader.ReadBytes((int)addFileOrReference.FData.Length);
                }
            }
            return Ok(await _workFilesService.AddWorkFileAsync(workFile));
        }

        [HttpGet("getFile/{courseWorkId}")]
        [ProducesResponseType(typeof(FileContentResult), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetCourseWorkFile(long courseWorkId, [FromQuery] string type)
        {
            var workFiles = await _workFilesService
                .GetFilteredWorkFilesAsync(wf => wf.CourseWorkId == courseWorkId && wf.Type == type)
                .ConfigureAwait(false);
            var workFile = workFiles.First();
            return File(workFile.Data, workFile.FileType, workFile.FileName);
        }
    }
}
