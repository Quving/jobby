from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class JobGroup(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=128)
    name = models.CharField(max_length=128)


class HostGroup(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=128)
    name = models.CharField(max_length=128)


class Host(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=128)
    hostgroup = models.ForeignKey(HostGroup, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    os = models.CharField(max_length=128)


class Job(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    registered_by = models.OneToOneField(User, on_delete=models.PROTECT)
    host = models.OneToOneField(Host, on_delete=models.CASCADE)
    jobgroup = models.ForeignKey(JobGroup, on_delete=models.CASCADE)
    status = models.CharField(max_length=24)
