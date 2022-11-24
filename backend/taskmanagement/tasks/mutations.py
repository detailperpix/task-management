from .models import Task
from .types import TaskType
from django.utils import timezone
import graphene


class AddTaskMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)

    task = graphene.Field(TaskType)

    @classmethod
    def mutate(cls, root, info, name, description):
        task = Task(name=name, description=description)
        task.name = name
        task.description = description
        task.save()
        return AddTaskMutation(task=task)

class FinishTaskMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    task = graphene.Field(TaskType)

    @classmethod
    def mutate(cls, root, info, id):
        task = Task.objects.get(pk=id)
        print("Finish Task Mutation", task)
        task.endTime = timezone.now()
        task.save()
        return AddTaskMutation(task=task)