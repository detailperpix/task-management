import Modal from 'react-modal';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from "../components/modal"
import NewTaskForm from "../components/new-task-form"
import RunningTask from "../components/task-card"
import {getRunningTask} from "../graphql/components/tasks"

Modal.setAppElement("#__next");


export async function getServerSideProps() {
    const { data } = await getRunningTask();

    return {
        props: { data }
    }
}

export default function Home({ data }) {
    const [showFormModal, setShowFormModal] = React.useState(false);
    const [tasks, setTasks] = React.useState(data.allTasks)
    console.log(tasks)
    function mutateTasks(tasks) {
        setTasks(tasks)
    }
    function closeFormModal() {
        setShowFormModal(false);
    }
    function afterOpenFormModal() {

    }

    function openFormModal() {
        setShowFormModal(true);
    }

    return (
        <div class="h-screen w-screen flex flex-col">
            <Modal
                isOpen={showFormModal}
                onAfterOpen={afterOpenFormModal}
                onRequestClose={closeFormModal}
                contentLabel="Modal Label"
                style={modalStyles}
            >
                <NewTaskForm tasks={tasks} setTasks={mutateTasks} closeFormModal={closeFormModal}/>

            </Modal>
            <div class="flex mx-auto items-center max-w-max my-5">
                <h1 class="text-5xl font-bold">Task Management App</h1>
            </div>

            <div class="w-1/2 text-center mx-auto center text-2xl font-medium text-white border py-4 px-2 bg-gray-500 rounded-lg">Task Listing</div>
            <div class="flex-grow">
                <div >
                    {tasks == null ? <p class="text-slate-500">No task currently</p>
                        : <div>
                            {tasks.map((data, idx) => {
                                return <RunningTask data={data} idx={idx} tasks={tasks} setTasks={mutateTasks}key={idx} />

                            })}
                        </div>
                    }
                </div>


            </div>

            <div class="mx-auto my-4">
                <button class="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={openFormModal}>Add Task</button>
            </div>
        </div>
    );
}