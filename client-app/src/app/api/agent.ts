import axios from 'axios';
import {Activity} from "../models/activity.ts";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5104/api';
axios.interceptors.response.use(async response => {
    try{
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: any) => response.data;   // This is a generic function that takes a response and returns the data property of the response.

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Activities = {
    list: () => requests.get<Activity[]>('/ActivityTask'),
    details: (id: string) => requests.get<Activity>(`/ActivityTask/${id}`),
    create: (activity: Activity) => requests.post<void>('/ActivityTask', activity),
    update: (activity: Activity) => requests.put<void>(`/ActivityTask/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/ActivityTask/${id}`)
};

const agent = {
    Activities
}

export default agent;