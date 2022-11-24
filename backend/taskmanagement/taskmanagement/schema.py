import graphene
import tasks.schema
import tasks.mutations


class Query(tasks.schema.Query, graphene.ObjectType):
    pass

class Mutation(tasks.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)