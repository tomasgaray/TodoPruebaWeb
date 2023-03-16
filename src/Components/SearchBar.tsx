import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import Input from "antd/es/input/Input";
import { SearchOutlined } from '@ant-design/icons';

function SearchBar(){
    return (
        <Row justify="center">
          <Col xs={24} sm={24} md={15} lg={14}  xl={12} span={24}>
            <Input prefix={<SearchOutlined />} size="large" placeholder="Busque una tarea" />
            {/* <Search size="large" placeholder="Busque una tarea" loading /> */}
          </Col>
        </Row>
    );
}

export default SearchBar;
