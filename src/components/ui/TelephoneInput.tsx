import { ComponentProps } from "react"
import { Control, useController } from "react-hook-form"

type TextInputProps =  ComponentProps<'input'> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    name: string,
    label?: string,
    containerClass?: string, 
}

const TelephoneInput = ({control, name, label, containerClass, ...inputProps}: TextInputProps) => {
    const {formState: {errors}} = useController({control, name: name})
    return(
    <div className={containerClass}>
        {label && <label  className="block mb-2  font-medium text-gray-900 dark:text-white">{label}</label> }
        <div className="relative">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                </svg>
            </div>
            <input type="text" id="phone-input" {...control.register(name)} {...inputProps} className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div>
        {errors[name] && <span className='text-red-600'>{errors[name].message?.toString()}</span>}
    </div>)
}


export default TelephoneInput