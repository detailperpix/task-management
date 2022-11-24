from graphene import ObjectType, List
from tasks.types import TaskType
from tasks.models import Task
from tasks.mutations import AddTaskMutation, FinishTaskMutation


    
class Query(ObjectType):
    all_tasks = List(TaskType)

    def resolve_all_tasks(root, info):
        return Task.objects.all()

class Mutation(ObjectType):
    add_task = AddTaskMutation.Field()
    finish_task = FinishTaskMutation.Field()
