import { gql, } from '@apollo/client';
import client from '../apollo-client';

export async function getRunningTask() {
    return client.query({
        query: gql`
            query {
                allTasks {
                id
                name
                description
                startTime
                endTime
            }
        }
        `
    })
}
export const ADD_TASK = gql`
mutation addNewTask($name:String!, $description:String!) {
    addTask (name:$name, description:$description) {
      task {
        id,
        name,
        description,
        startTime,
        endTime
        
      }
    }
  }`

export async function addNewTask(task) {
    return client.mutate({
        awaitRefetchQueries: true,
        mutation: ADD_TASK,
        variables: task
    })
}