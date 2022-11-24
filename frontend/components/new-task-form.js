async function handleSubmit(event) {
    event.preventDefault()
    const data = {
        name: event.target.name.value,
        description: event.target.description.value
    }

    console.log(data)

}
export default function NewTaskForm() {

    return <div class="p-8">
        <form onSubmit={handleSubmit} method='get' class="items-center flex flex-col gap-y-8">
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
}