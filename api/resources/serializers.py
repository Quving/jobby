from rest_framework import serializers

from resources.models import Job, Host, JobGroup, HostGroup


class JobSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Job
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
