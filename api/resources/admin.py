from django.contrib import admin

# Register your models here.
from resources.models import Job, Group, Host

admin.site.register(Job)
admin.site.register(Group)
admin.site.register(Host)
