from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class JobGroup(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class HostGroup(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Host(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    hostgroup = models.ForeignKey(HostGroup, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    os = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Job(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=512)
    jobgroup = models.ForeignKey(JobGroup, on_delete=models.CASCADE)
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Report(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    logs = models.CharField(max_length=10000)
    name = models.CharField(max_length=128)
    status = models.CharField(max_length=24)

    def __str__(self):
        return self.name
