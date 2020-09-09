from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class JobGroup(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128)


class HostGroup(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    name = models.CharField(max_length=128)


class Host(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=512)
    hostgroup = models.ForeignKey(HostGroup, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    os = models.CharField(max_length=128)


class Job(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=512)
    jobgroup = models.ForeignKey(JobGroup, on_delete=models.CASCADE)
    host = models.OneToOneField(Host, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    registered_by = models.OneToOneField(User, on_delete=models.PROTECT)
    status = models.CharField(max_length=24)
