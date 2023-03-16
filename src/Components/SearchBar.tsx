import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import Input from "antd/es/input/Input";
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../app/hooks";
import { taskActions } from "../pages/Task/actions/task.action";
import {DebounceInput} from 'react-debounce-input';

function SearchBar(){
  const dispatch = useAppDispatch();
  const search = (text:string)=>{
    if(text.length ==0){
      dispatch(taskActions.get());
      return;  
    }
    dispatch(taskActions.search(text));
  }
  
    return (
        <Row justify="center">
          <Col xs={24} sm={24} md={15} lg={14}  xl={12} span={24}>
            {/* <Input prefix={<SearchOutlined />} onChange={(e)=> search(e.target.value)} size="large" placeholder="Busque una tarea" /> */}
            <DebounceInput
                placeholder="Busque una tarea por título o descripción"
                style={{width:"100%"}}
                onChange={(e:any)=> search(e.target?.value)} 
                value=""
                size="large"
                prefix={<SearchOutlined />}
                debounceTimeout={700}
                element={Input as any} />
          </Col>
        </Row>
    );
}

export default SearchBar;
