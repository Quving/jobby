from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class JobGroup(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name


class HostGroup(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name


class Host(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    hostgroup = models.ForeignKey(HostGroup, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, unique=True)
    os = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Job(models.Model):
    auth_token = models.CharField(max_length=2048, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    jobgroup = models.ForeignKey(JobGroup, on_delete=models.CASCADE)
    jobuser = models.OneToOneField(User,
                                   related_name='job_auth',
                                   on_delete=models.CASCADE,
                                   null=True)
    name = models.CharField(max_length=128, unique=True)

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        if self.jobuser:
            self.jobuser.delete()

    def __str__(self):
        return self.name


class Report(models.Model):
    status_choices = [
        ('success', 'Success'),
        ('error', 'Error'),
        ('warning', 'Warning'),
        ('undefined', 'Undefined'),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    logs = models.CharField(max_length=16384)
    name = models.CharField(max_length=128)
    status = models.CharField(max_length=24, choices=status_choices, default='undefined')

    def __str__(self):
        return self.name
