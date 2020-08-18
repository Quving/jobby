from django.urls import path

from resources import views

urlpatterns = [
    path('job/', views.JobList.as_view()),
    path('job/<int:pk>/', views.JobDetail.as_view()),
    path('host/', views.HostList.as_view()),
    path('host/<int:pk>/', views.HostDetail.as_view()),
    path('group/', views.GroupList.as_view()),
    path('group/<int:pk>/', views.GroupDetail.as_view()),
]
