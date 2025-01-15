import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { router } from "../main";
import { handleApiError } from "./Error";

export const client = (() => {
    const client = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers:{
            'Content-Type': 'application/json'
        }
    })

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const accessToken = localStorage.getItem('token');
          if (accessToken) {
            config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
          }
          return config;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        },
      );

    client.interceptors.response.use(
        (res: AxiosResponse) => {
          if(res?.data?.code == 400){
            return Promise.reject(new Error('User Exist'))
          }
          return res;
        },
        async (error: AxiosError) => {
          const status = error.response ? error.response.status : null;
          console.log('axios errorrrr===>', status)
      
          if (status === 401) {
            try {
               localStorage.removeItem(
                'token'
              );
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (router.options.context as any).modal.remove()

              router.navigate({from: router.basepath,to: '/login'})

             //window.location.href = '/login'
              
              
            } catch (error) {
              return Promise.reject(error);
            }
          }
      
          // if (status === 403 && error.response?.data) {
          //   return Promise.reject(error.response.data);
          // }
      
          return Promise.reject(error);
        }
      );
    return client
})()

const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => {
      const { data } = response;
      return data;
    };
  
    const onError = function (error: AxiosError) {
      return handleApiError(error)
      //  Promise.reject({
      //   message: error.message,
      //   code: error.code,
      //   response: error.response,
      // });
    };
  
    return client(options).then(onSuccess).catch(onError);
  };
  
  export default request;