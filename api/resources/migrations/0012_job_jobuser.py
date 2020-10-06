# Generated by Django 3.1 on 2020-10-06 22:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('resources', '0011_auto_20200923_1544'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='jobuser',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='job_auth', to=settings.AUTH_USER_MODEL),
        ),
    ]
