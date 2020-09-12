from django.contrib.auth.models import User
from rest_framework import serializers

from resources.models import Job, Host, JobGroup, HostGroup, Report


class JobSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Job
        fields = "__all__"


class ReportSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Report
        fields = "__all__"


class HostSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Host
        fields = "__all__"


class JobGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = JobGroup
        fields = "__all__"


class HostGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = HostGroup
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'last_login', 'id'
        ]
