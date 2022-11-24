import { finishCurrentTask } from "../graphql/components/tasks";

function humanReadableTime(date) {
    // assume passed starttime
    const startTime = new Date(date);
    const currentTime = Date.now();
    const hour = Math.round((currentTime - startTime) / 3600000)
    const mins = Math.round((currentTime - startTime) / 60000)
    return  (hour) >= 1 ? hour.toString() + " hr" : mins.toString() + " mins"

}

async function finishTask(event, data, tasks, setTasks) {
    const task = await finishCurrentTask(data.id);

    const newTask = tasks.filter(t => t.id != data.id).concat(task.data.finishTask.task)
    newTask.sort((a, b) => a.id - b.id)
    setTasks(newTask)
}
export default function RunningTask({ data, idx, tasks, setTasks }) {
    return (
        <div class="flex gap-2 p-6 my-1 max-w-3xl mx-auto bg-white rounded-xl shadow-lg items-center space-y-2">

            <div class="flex-grow">
                <p class="italic font-bold text-2xl">{data.name}</p>
                <p class=""><strong>Description:</strong> {data.description}</p>
            </div>

            <div>
                <p class="">{data.startTime}</p>
                {data.endTime ? <p>{data.endTime} </p>: <p> {humanReadableTime(data.startTime)} elapsed</p>}
            </div>
            <button onClick={(e) => finishTask(e, data, tasks, setTasks)}
            class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Finish Task
            </button>
        </div>
    )

}