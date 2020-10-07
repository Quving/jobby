from django.contrib.auth.models import User
from rest_framework import serializers

from resources.models import Job, Host, JobGroup, HostGroup, Report


class HostGroupSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    id = serializers.ReadOnlyField(read_only=True)

    class Meta:
        model = HostGroup
        fields = "__all__"


class HostSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    hostgroup_detailed = HostGroupSerializer(read_only=True, source='hostgroup')
    id = serializers.ReadOnlyField()

    class Meta:
        model = Host
        fields = "__all__"


class JobGroupSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    id = serializers.ReadOnlyField()

    class Meta:
        model = JobGroup
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    host_detailed = HostSerializer(read_only=True, source='host')
    id = serializers.ReadOnlyField()
    jobgroup_detailed = JobGroupSerializer(read_only=True, source='jobgroup')

    class Meta:
        model = Job
        fields = "__all__"


class ReportSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    job_detailed = JobSerializer(read_only=True, source='job')

    class Meta:
        model = Report
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'last_login', 'id']
