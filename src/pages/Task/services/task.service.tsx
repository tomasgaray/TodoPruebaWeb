import axios from 'axios';
import { Task } from '../models/task';
import environment from '../../../environment';

export const taskService = {
    get,
    search,
    add,
    edit,
    remove,
    changeStatus
  };

  function add(task:Task) {
    return axios.post(`${environment.apiUri}/todoTask`, task)
  };
  function edit(task:Task) {
    return axios.put(`${environment.apiUri}/todoTask`, task)
  };
  function remove(taskId:number) {
    return axios.delete(`${environment.apiUri}/todoTask/${taskId}`)
  };
  function get() {
    return axios.get(`${environment.apiUri}/todoTask`)
  };
  function search(text:string) {
    return axios.get(`${environment.apiUri}/todoTask/search/${text}`)
  };
 
  function changeStatus(taskId:number, completed: boolean) {
    return axios.put(`${environment.apiUri}/todoTask/changeStatus/${taskId}/${completed}`)
  };
 