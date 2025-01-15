import { useRouter } from "@tanstack/react-router"

type ErrorComponentProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error :  any
}

const ErrorComponent = ({error}: ErrorComponentProps) => {
    const router = useRouter()
    return (
        <div className="flex justify-center">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{error.message}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Check internet connection</p>
                <button onClick={() => router.invalidate()}> Refresh</button>
            </div>
        </div>

    )
}

export default ErrorComponent