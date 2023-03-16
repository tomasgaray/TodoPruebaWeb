import Button from "antd/es/button";
import List from "antd/es/list";
import Popconfirm from "antd/es/popconfirm";
import Tooltip from "antd/es/tooltip";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task } from "../models/task";
import { taskActions } from "../actions/task.action";
import { TypeDialog } from "../../../enums/type.dialog";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";

function TaskItem(props: any) {
    const { item} = props;
    const dispatch = useAppDispatch();   
    const loading  = useSelector((state: any) => state.tasksReducer.loading as boolean);
    const removeTask = (task: Task) => {
      dispatch(taskActions.remove(task.taskId!));
    };
      
    const openTask = (task:Task)=> {
      dispatch(taskActions.openModalAddEdit({
        open : true,
        select :task,
        type : TypeDialog.edit,
        loading: false
      }));
    }

    return(
        <List.Item  
                  actions={[
                    <Tooltip title="Editar">
                        <Button type="primary" onClick={()=>openTask(item)} disabled={loading} ghost shape="circle" icon={<EditOutlined />} />
                      </Tooltip>, 
                        <Popconfirm
                            title="Eliminar Tarea"
                            disabled={loading}
                            description="¿Esta seguro que desea eliminar esta tarea?"
                            onConfirm={()=>{removeTask(item)}}
                            okText="Si"
                            cancelText="No"
                          >
                          <Button type="primary" danger  shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
   
                  ]}>
                <List.Item.Meta 
                    // avatar={ 
                    //   <Checkbox onChange={()=>{}}></Checkbox>
                    // }
                    title={<span onClick={()=>openTask(item)} >{item.title}</span>} description="Tarea creada" />
                </List.Item>
    )
}

export default TaskItem;