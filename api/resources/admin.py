from django.contrib import admin

# Register your models here.
from resources.models import Job, Host, HostGroup, JobGroup, Report

admin.site.register(HostGroup)
admin.site.register(JobGroup)
admin.site.register(Job)
admin.site.register(Host)
admin.site.register(Report)
