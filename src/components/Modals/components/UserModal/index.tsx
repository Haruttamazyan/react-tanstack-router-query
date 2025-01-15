

import { SubmitHandler, useForm } from "react-hook-form"
import TextInput from "../../../../components/ui/TextInput"
import { useModalContext } from "../../../../providers/ModalProvider"
import { zodResolver } from "@hookform/resolvers/zod"
//import { Route } from "@tanstack/react-router"
//import { useUserCreation } from "../../../../api/services/user/mutation"
import { z } from "zod"
import TelephoneInput from "../../../../components/ui/TelephoneInput"
import { User } from "../../../../features/user/types"
import ModalHeader from "./ModalHeader"
import { useMemo, useState } from "react"
import queryClient from "../../../../api/QueryClient"
import parsePhoneNumber from 'libphonenumber-js'
import { toast } from "react-toastify"


export type UserCreateOrEditProps = {
    user?: User | undefined,
    submit: (data: UserFormFields & {status : string, id: string}) => Promise<unknown>
}

const userFormSchema = z.object({
    name: z.string()
    .min(1, { message: "Input cannot be empty" })
    .max(50, { message: "Input must be 50 characters or less" })
    .regex(/^[\p{L}]+(\s[\p{L}]+)?$/u, { message: "Invalid Full Name" }),
    phone: z.string().startsWith('374').transform((arg,ctx) => {
        const phone = parsePhoneNumber(arg,{
            defaultCountry: 'AM',
            extract: false
        })
        if(phone && phone.isValid()){
            return arg
        }
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number',
        });
        return z.NEVER;
    }),
    email: z.string().email().nullable().optional(),
    ssn: z.string().length(10, { message: "Must be exactly 10 characters long" })

  })
  
export type UserFormFields = z.infer<typeof userFormSchema>


export const UserModal = ({user, submit}: UserCreateOrEditProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { remove } = useModalContext()
    const defaultData = useMemo(() => {
        if(user){
            return {
                ...user,
                email:user.email?user.email: null,
            }
        }
        return {
            email: null,
            phone : 374
        }
    },[user])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { control, handleSubmit, formState: {errors}, setError } = useForm<UserFormFields | any>({
        mode: 'onChange',
        defaultValues: defaultData,
      resolver: zodResolver(userFormSchema),
    })
  
    const onSubmit: SubmitHandler<UserFormFields> = 
      async (data: UserFormFields) => {
        try{
            setIsLoading(true)
            if(!data.email){
                delete data.email
            }
            await submit({...data, status: user?.status || '', id: String(user?.id || 0) })
            remove()

            await queryClient.invalidateQueries({ queryKey: ['users'] })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(e: any) {

            if(e.statusCode == 406){
                Object.keys(e.body).forEach(key => {
                    setError(key,{
                        message: e.body[key]
                    })
                })
            }else if( e.statusCode == 400){
                setError('root',{
                    message: e.message
                })
                
            } else {
                toast.error("Something Happend check again")
                remove()
            }
            
            
        } finally {
            setIsLoading(false)
        }
      }
    
  

    return (
        <div className="fixed flex top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <ModalHeader  editMode={user?.id?true: false} />
                <form onSubmit={handleSubmit(onSubmit)} className="relative ">

                <div className="p-6 space-y-6">
                    <div className="grid  gap-6">
                    <TextInput
                        control={control}
                        name="name"
                        label="Enter Full Name"
                        containerClass='col-span-6 sm:col-span-3'
                        placeholder="John Doe"
                    />
                    <TelephoneInput
                        control={control}
                        name="phone"
                        label="Enter Phone"
                        containerClass='col-span-6 sm:col-span-3'
                        placeholder="374-77-11-11-11"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length < 3) {
                              e.target.value = '374';
                            }
                          }}
                    />
                    <TextInput
                        control={control}
                        name="email"
                        label="Enter Email"
                        containerClass='col-span-6 sm:col-span-3'
                        placeholder="Email"
                    />
                    <TextInput
                        control={control}
                        type="number"
                        name="ssn"
                        label="Enter Ssn"
                        containerClass='col-span-6 sm:col-span-3'
                        placeholder="1111111111"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length > 10) {
                              e.target.value = e.target.value.slice(0, 10);
                            }
                          }}
                    />
                        
                    </div>
                </div>
                {errors.root && <div className="flex items-center justify-center"><span className='text-red-600 font-medium'>{errors.root.message?.toString()}</span></div> }
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading? 'Loading...': 'save'}</button>
                </div>
            </form>
        </div>
    </div>

    )
}
