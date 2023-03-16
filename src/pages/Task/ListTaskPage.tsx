import Button from "antd/es/button";
import Col from "antd/es/col";
import Divider from "antd/es/divider";
import Empty from "antd/es/empty";
import { Content } from "antd/es/layout/layout";
import List from "antd/es/list";
import Row from "antd/es/row";
import Spin from "antd/es/spin";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { TypeDialog } from "../../enums/type.dialog";
import { taskActions } from "./actions/task.action";
import TaskItem from "./components/TaskItem";
import { DialogAddEditTask } from "./dialog/dialog.add.edit.task";
import { Task } from "./models/task";

function ListTaskPage(){
  const tasks:Task[]  = useSelector((state: any) => state.tasksReducer.tasks as Task[]);
  const loading  = useSelector((state: any) => state.tasksReducer.loading as boolean);
  const dispatch = useAppDispatch();  
    
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
                    <Title level={3}>Listado de Tareas</Title>
                    {
                        (tasks??[]).length ==0  ? <></> : <Button type="primary" disabled={loading} onClick={addTask}>Nueva</Button>
                    }
                    <Divider />
                    { loading? <Spin /> : <></>}
                    {
                        (tasks??[]).length ==0 ? 
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tu lista de tareas se encuentra vacia" >
                        <Button disabled={loading} onClick={addTask} type="primary">Nueva tarea</Button>
                        </Empty>
                        :<List
                            itemLayout="horizontal"
                            dataSource={tasks}
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

