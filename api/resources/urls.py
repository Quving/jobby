from django.urls import path

from resources import views

urlpatterns = [
    path('job/', views.JobList.as_view()),
    path('job/<int:pk>/', views.JobDetail.as_view()),
    path('host/', views.HostList.as_view()),
    path('host/<int:pk>/', views.HostDetail.as_view()),
    path('jobgroup/', views.JobGroupList.as_view()),
    path('jobgroup/<int:pk>/', views.JobGroupDetail.as_view()),
    path('hostgroup/', views.HostGroupList.as_view()),
    path('hostgroup/<int:pk>/', views.HostGroupDetail.as_view()),
]
