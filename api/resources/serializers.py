from rest_framework import serializers

from resources.models import Job, Host, Group


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


class GroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Group
        fields = "__all__"
