async function getRunningTask() {
    return Promise.resolve({
        taskName: "Long Task Name"
    })
}
export async function getServerSideProps() {
    const data = await getRunningTask();
    return {
        props: { data }
    }
}

function RunningTask({data}) {
    return (
        <div>
            {data.taskName}
        </div>
    )

}

function handleAddTask() {
    console.log("Add Task Handled")
}
export default function Home({ data }) {
    return (
        <div class="h-screen w-screen flex flex-col">
            <div class="flex mx-auto items-center max-w-max my-5">
                <h1 class="text-5xl font-bold">Task Management Home</h1>
            </div>

            <div class="flex-grow">
                <div class="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg items-center space-x-4">
                    <div class="text-xl font-medium text-black">Current Task</div>
                    {data == null ? <p class="text-slate-500">No task currently</p>
                    : <RunningTask data={data}/>
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