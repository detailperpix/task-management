import graphene
from graphene_django import DjangoObjectType

from tasks.models import Task

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "name", "description", "startTime", "endTime")

class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)

    def resolve_all_tasks(root, info):
        return Task.objects.all()

schema = graphene.Schema(query=Query)