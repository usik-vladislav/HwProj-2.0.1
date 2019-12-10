﻿using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using HwProj.NotificationsService.API.Models;
using HwProj.NotificationsService.API.Repositories;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HwProj.NotificationsService.API.Services
{
    public class NotificationsService : INotificationsService
    {
        private readonly INotificationsRepository _repository;

        public NotificationsService(INotificationsRepository repository)
        {
            _repository = repository;
        }

        public async Task<long> AddNotificationAsync(string userId, Notification notification)
        {
            notification.Date = DateTime.Now;
            notification.Owner = userId;
            var id = await _repository.AddAsync(notification).ConfigureAwait(false);
            return id;
        }

        public async Task<Notification[]> GetAsync(string userId, NotificationFilter filter = null)
        {
            if (filter == null)
            {
                return await _repository.GetAllByUserAsync(userId);
            }
            var mapperOfSpecification = new MapperOfSpecification();
            var specification = mapperOfSpecification.GetSpecification(filter);
            return await _repository.GetAllByUserAsync(userId, filter.Offset, filter.MaxCount, specification).ConfigureAwait(false);
        }

        public async Task MarkAsSeenAsync(string userId, long[] notificationIds)
        {
            await _repository.UpdateBatchAsync(userId, notificationIds,
                t => new Notification {HasSeen = true}).ConfigureAwait(false);
        }

        public async Task MarkAsImprotant(string userId, long[] notificationIds)
        {
            await _repository.UpdateBatchAsync(userId, notificationIds,
                t => new Notification { Important = true }).ConfigureAwait(false);
        }

        public async Task GetInTimeAsync(string userId, int maxCount)
        {

        }
    }
}