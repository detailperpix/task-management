from .models import Task
from .types import TaskType
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