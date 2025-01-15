import { ComponentProps } from "react"
import { Control, useController } from "react-hook-form"

type TextInputProps =  ComponentProps<'input'> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    name: string,
    label?: string,
    containerClass?: string, 
}

const TextInput = ({control, name, label, containerClass, ...inputProps}: TextInputProps) => {
    const {formState: {errors}} = useController({control, name: name})
    return(
    <div className={containerClass}>
        {label && <label className="block mb-2  font-medium text-gray-900 dark:text-white">{label}</label> }
        <input {...control.register(name)} {...inputProps} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {errors[name] &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {errors[name].message?.toString()}.</p>}
    </div>)
}


export default TextInput