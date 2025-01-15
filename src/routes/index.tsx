import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute('/' as never)({
    component: () => <Navigate to="/users" search={{search:''}} />
})

// function IndexComponent() {
//     return(
//         <h1 className="text-3xl font-bold underline">
//         Hello world!
//         </h1>
//     )
// }