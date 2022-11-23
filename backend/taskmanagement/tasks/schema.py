from graphene import relay, ObjectType, List, Schema
from graphene_django import DjangoObjectType
from tasks.models import Task

class TaskNode(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "name", "description", "startTime", "endTime")
        interfaces = (relay.Node, )
    
class Mutation(ObjectType):
    pass

class Query(ObjectType):
    category = relay.Node.Field(TaskNode)
    all_tasks = List(TaskNode)

    def resolve_all_tasks(root, info):
        return Task.objects.all()

