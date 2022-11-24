import { useEffect, useState } from "react";
import { finishCurrentTask } from "../graphql/components/tasks";

function humanReadableTimeDiff(date) {
    // assume passed starttime
    const startTime = new Date(date);
    const currentTime = Date.now();
    const hour = Math.round((currentTime - startTime) / 3600000)
    const mins = Math.round((currentTime - startTime) / 60000)
    return  (hour) >= 1 ? hour.toString() + " hr" : mins.toString() + " mins"

}

function humanReadableTime(date) {
    const datetime = new Date(date)
    return `${datetime.toLocaleTimeString()} ${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`
}

async function finishTask(event, data, tasks, setTasks) {
    const task = await finishCurrentTask(data.id);

    const newTask = tasks.filter(t => t.id != data.id).concat(task.data.finishTask.task)
    newTask.sort((a, b) => a.id - b.id)
    setTasks(newTask)
}
export default function RunningTask({ data, idx, tasks, setTasks }) {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    useEffect(() => {
        setStartTime(humanReadableTime(data.startTime))
        if (data.endTime) {
            setEndTime("Task Completed: " + humanReadableTime(data.endTime))
        } else {
            setEndTime(humanReadableTimeDiff(data.startTime) + " elapsed")
        }

    })
    return (
        <div class="flex gap-2 p-6 my-1 max-w-3xl mx-auto bg-white rounded-xl shadow-lg items-center space-y-2">

            <div class="flex-grow">
                <p class="italic font-bold text-2xl">{data.name}</p>
                <p><strong>Description:</strong> {data.description}</p>
            </div>

            <div>
                <p>Task Created: {startTime}</p>
                {/* {data.endTime ? <p>Task Completed: {humanReadableTime(data.endTime)} </p>: <p> {humanReadableTimeDiff(data.startTime)} elapsed</p>} */}
                <p>{endTime}</p>
            </div>
            {!data.endTime && <button onClick={(e) => finishTask(e, data, tasks, setTasks)}
            class="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Finish Task
            </button>}
        </div>
    )

}