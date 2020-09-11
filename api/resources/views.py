# Create your views here.
from rest_framework import generics, permissions

from resources.models import Job, Host, JobGroup, HostGroup, Report
from resources.serializers import JobSerializer, HostGroupSerializer, JobGroupSerializer, HostSerializer, \
    ReportSerializer


class ReportList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class JobList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer


class JobGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer


class HostGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all()
    serializer_class = HostGroupSerializer


class HostGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all()
    serializer_class = HostGroupSerializer


class HostList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Host.objects.all()
    serializer_class = HostSerializer


class HostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Host.objects.all()
    serializer_class = HostSerializer
