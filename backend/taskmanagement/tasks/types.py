from tasks.models import Task
from graphene_django import DjangoObjectType

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "name", "description", "startTime", "endTime")