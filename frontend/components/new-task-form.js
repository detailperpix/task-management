import { addNewTask } from "../graphql/components/tasks"
async function handleSubmit(event, tasks, setTasks) {
    event.preventDefault()
    const task = {
        name: event.target.name.value,
        description: event.target.description.value
    }
    console.log(task)
    const result = await addNewTask(task)
    console.log(result)
    if (result) {
        setTasks([...tasks, result.data.addTask.task])
    }

}
export default function NewTaskForm({tasks, setTasks, closeFormModal}) {

    return <div class="p-8">
        <form onSubmit={(e) => {handleSubmit(e, tasks, setTasks); closeFormModal()}} class="items-center flex flex-col gap-y-8">
            <label for="name" class="block">
                Task Name:
                <input type="text" id="name" name="name" maxLength="48" minLength="1"
                class="block border border-slate-500 rounded-md" />
            </label>

            <label for="description" class="block">
                Task Description:
                <textarea id="description" name="description" maxLength="128" minLength="1"
                
                class="block border border-slate-500 rounded-md"></textarea>
            </label>

            <button type="submit" class="align-end py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Submit
            </button>
        </form>
    </div>
}