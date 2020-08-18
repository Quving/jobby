from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Job(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    registered_by = models.OneToOneField(User, on_delete=models.PROTECT)
    status = models.CharField(max_length=24)


class Group(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=128)
    name = models.CharField(max_length=128)


class Host(models.Model):
    created_by = models.OneToOneField(User, on_delete=models.PROTECT)
    description = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    os = models.CharField(max_length=128)
