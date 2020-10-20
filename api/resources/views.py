# Create your views here.
import random
import string

from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from resources.filters import ReportFilter
from resources.models import Job, Host, JobGroup, HostGroup, Report
from resources.serializers import JobSerializer, HostGroupSerializer, JobGroupSerializer, HostSerializer, \
    ReportSerializer, UserSerializer


class ReportList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [TokenAuthentication, JWTAuthentication, SessionAuthentication]
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer
    filterset_class = ReportFilter


class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class JobList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer

    def __get_random_string(self, len):
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(len))
        return result_str

    def perform_create(self, serializer):
        default_name = 'noname' + self.__get_random_string(8)
        username = "job.{}".format(self.request.data.get('name', default_name))
        # Lowercase and using underscore.
        username = username.lower().replace(" ", "_")

        user = User.objects.create_user(username=username,
                                        email='{}@job.com'.format(username),
                                        password=username)

        auth_token = Token.objects.create(user=user).key
        serializer.save(auth_token=auth_token, created_by=self.request.user, jobuser=user)


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all().order_by('-created_at')
    serializer_class = JobGroupSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class JobGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer


class HostGroupList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all().order_by('-created_at')
    serializer_class = HostGroupSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HostGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = HostGroup.objects.all()
    serializer_class = HostGroupSerializer


class HostList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Host.objects.all().order_by('-created_at')
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
