export default function RunningTask({ data }, idx) {
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