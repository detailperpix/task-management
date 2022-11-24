import { gql } from '@apollo/client';
import Modal from 'react-modal';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import client from '../apollo-client'
import modalStyles from "../components/modal"
import NewTaskForm from "../components/new-task-form"
import RunningTask from "../components/task-card"

Modal.setAppElement("#__next");

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
    const { data } = await getRunningTask();

    return {
        props: { data }
    }
}

export default function Home({ data }) {
    const [showFormModal, setShowFormModal] = React.useState(false);
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
                <NewTaskForm />

            </Modal>
            <div class="flex mx-auto items-center max-w-max my-5">
                <h1 class="text-5xl font-bold">Task Management Home</h1>
            </div>

            <div class="flex-grow">
                <div >
                    <div class="self-center text-xl font-medium text-black">Current Task</div>
                    {data == null ? <p class="text-slate-500">No task currently</p>
                        : <div>
                            {data.allTasks.map((data, idx) => {
                                return <RunningTask data={data} idx={idx} key={idx} />

                            })}
                        </div>
                    }
                </div>


            </div>

            <div class="mx-auto my-4">
                <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={openFormModal}>Add Task</button>
            </div>
        </div>
    );
}