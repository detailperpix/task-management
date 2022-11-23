import { gql } from '@apollo/client';
import React from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import client from '../apollo-client'

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

function RunningTask({ data }, idx) {
    console.log(data, idx)
    return (
        <div class="flex gap-2 p-6 my-1 max-w-3xl mx-auto bg-white rounded-xl shadow-lg items-center space-y-2">
            <div class="flex-grow">
                <p class="italic font-bold text-2xl">{data.name}</p>
                <p class=""><strong>Description:</strong> {data.description}</p>
            </div>

<div>
            <p class="">{data.startTime}</p>
            <p>{Math.round((Date.now() - new Date(data.startTime)) / 3600000)}h elapsed</p>
</div>
            <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Finish Task
            </button>
        </div>
    )

}

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}


export default function Home({ data }) {
    const [showFormModal, setShowFormModal] = React.useState(false);

    function openFormModal() {
        setShowFormModal(true);
    }
    function closeFormModal() {
        setShowFormModal(false);
    }
    function afterOpenFormModal() {

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
                <div class="p-8">
                    <form action='/addNewTask' method='get' class="items-center flex flex-col gap-y-8">
                        <label for="name" class="block">
                            Task Name:
                            <input type="text" id="name" name="name" maxLength="48" class="block border border-slate-500 rounded-md" />
                        </label>

                        <label for="description" class="block">
                            Task Description:
                            <textarea id="description" name="description" maxLength="128" class="block border border-slate-500 rounded-md"></textarea>
                        </label>

                        <button type="submit" class="align-end py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                            Submit
                        </button>
                    </form>
                </div>

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
                                return <RunningTask data={data} idx={idx} />

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