from django_filters import rest_framework as filters

from resources.models import Report


class ReportFilter(filters.FilterSet):
    createdAt = filters.DateTimeFilter(field_name='created_at', lookup_expr='date')
    createdAtSince = filters.DateTimeFilter(field_name='created_at', lookup_expr='gt')
    logContains = filters.CharFilter(field_name='log', lookup_expr='icontains')
    name = filters.CharFilter(field_name='name', lookup_expr='exact')
    status = filters.CharFilter(field_name='status', lookup_expr='exact')
    jobId = filters.NumberFilter(field_name='job', lookup_expr='exact')

    class Meta:
        model = Report
        fields = [
            'createdAt',
            'createdAtSince',
            'jobId',
            'name',
            'logContains',
            'status',
        ]

