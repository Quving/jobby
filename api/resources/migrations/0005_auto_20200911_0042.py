# Generated by Django 3.1 on 2020-09-11 00:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0004_auto_20200909_0028'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='status',
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('logs', models.CharField(max_length=512)),
                ('name', models.CharField(max_length=128)),
                ('status', models.CharField(max_length=24)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.job')),
            ],
        ),
    ]
