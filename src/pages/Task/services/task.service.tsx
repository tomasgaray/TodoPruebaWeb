import axios from 'axios';
import { Task } from '../models/task';

export const taskService = {
    add,
    edit,
    remove
  };

  function add(task:Task) {
    return axios.post(`${process.env.URL_API}/api/todoTask`, task)
  };
  function edit(task:Task) {
    return axios.put(`${process.env.URL_API}/api/todoTask`, task)
  };
  function remove(taskId:number) {
    return axios.delete(`${process.env.URL_API}/api/todoTask/${taskId}`)
  };
 