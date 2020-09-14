# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response

from resources.models import Job, Host, JobGroup, HostGroup, Report
from resources.serializers import JobSerializer, HostGroupSerializer, JobGroupSerializer, HostSerializer, \
    ReportSerializer, UserSerializer


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

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class JobGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer


class HostGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all()
    serializer_class = HostGroupSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HostGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all()
    serializer_class = HostGroupSerializer


class HostList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Host.objects.all()
    serializer_class = HostSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Host.objects.all()
    serializer_class = HostSerializer


class WhoAmIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve information about the current user.
        :param request:
        :return:
        """

        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
