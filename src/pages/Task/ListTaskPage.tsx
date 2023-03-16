import Button from "antd/es/button";
import Col from "antd/es/col";
import Divider from "antd/es/divider";
import Empty from "antd/es/empty";
import { Content } from "antd/es/layout/layout";
import List from "antd/es/list";
import Row from "antd/es/row";
import Select from "antd/es/select";
import Space from "antd/es/space";
import Title from "antd/es/typography/Title";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { TypeDialog } from "../../enums/type.dialog";
import { filter } from "../../shared/shared";
import { taskActions } from "./actions/task.action";
import TaskItem from "./components/TaskItem";
import { DialogAddEditTask } from "./dialog/dialog.add.edit.task";
import { Task } from "./models/task";

function ListTaskPage(){
  const tasks:Task[]  = useSelector((state: any) => state.tasksReducer.tasks as Task[]);
  const loading  = useSelector((state: any) => state.tasksReducer.loading as boolean);
  const dispatch = useAppDispatch();
  const [filterStatus, setFilterStatus] = React.useState(-1);
  const filteredTasks = filter(tasks, filterStatus);
    useEffect(()=>{
        dispatch(taskActions.get());
    },[]);

    const addTask = ()=>{
        dispatch(taskActions.openModalAddEdit({
            open : true,
            select :new Task(),
            type : TypeDialog.add,
            loading: false
            })
        );
    }

  
    return (
        <Content style={{ padding: '20px 50px' }}>
            <Row justify="center" >
                <Col xs={24} sm={24} md={15} lg={14} xl={12} span={24}>
                    <Space wrap align="center">
                        <Title level={3}>Listado de Tareas</Title>
                        {
                            (filteredTasks??[]).length ===0  ? <></> : <Button type="primary" disabled={loading} onClick={addTask}>Nueva</Button>
                        }
                        <Select
                        defaultValue={-1}
                        value={filterStatus}
                        style={{ width: 120 }}
                        onChange={(e)=>{setFilterStatus(e)}}
                        options={[{ value: -1, label: 'Todos' },{value: 1, label: 'Completos' },{ value: 0, label: 'Incompletos' }]}
                        />
                        
                    </Space>

                    <Divider />
                    {
                        (filteredTasks??[]).length ===0 && !loading ? 
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tu lista de tareas se encuentra vacia" >
                         <Button disabled={loading} onClick={addTask} type="primary">Nueva tarea</Button>
                        </Empty>
                        :<List
                            itemLayout="horizontal"
                            dataSource={filteredTasks}
                            loading={loading}
                            renderItem={(item, index) => (
                                <TaskItem item={item}/>
                            )}
                        />
                    }
                </Col>
            </Row>
          <DialogAddEditTask/>
        </Content>
    )
}

export default ListTaskPage;

