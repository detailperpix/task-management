import { gql } from '@apollo/client';
import React from 'react';
import client from '../apollo-client'

async function getRunningTask() {
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
export async function getServerSideProps() {
    const { data }= await getRunningTask();
    return {
        props: { data }
    }
}

function RunningTask({data}, idx) {
    console.log(data, idx)
    return (
        <div class="p-6 my-1 max-w-3xl mx-auto bg-white rounded-xl shadow-lg items-center space-x-4">
            <p class="">{data.name}</p>
            <p class=""><strong>Description:</strong> {data.description}</p>
            <p class="">{data.startTime} - {Math.round((Date.now() - new Date(data.startTime))/3600000)}h elapsed</p>
        </div>
    )

}


export default function Home({ data }) {
    const [showFormModal, setShowFormModal] = React.useState(false);

    function handleAddTask() {
        setShowFormModal(true);
        console.log("Task Handled: ", showFormModal)
    }
    return (
        <div class="h-screen w-screen flex flex-col">
            <div class="flex mx-auto items-center max-w-max my-5">
                <h1 class="text-5xl font-bold">Task Management Home</h1>
            </div>

            <div class="flex-grow">
                <div >
                    <div class="text-xl font-medium text-black">Current Task</div>
                    {data == null ? <p class="text-slate-500">No task currently</p>
                    : <div> 
                        {data.allTasks.map((data, idx) => {
                            return <RunningTask data={data} idx={idx}/>

                        })}
                    </div>
                    }
                </div>


            </div>

            <div class="mx-auto my-4">
                <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" 
                onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
}