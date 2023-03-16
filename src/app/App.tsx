import './App.css';
import 'antd/dist/reset.css';
import Layout, { Header } from 'antd/es/layout/layout';
import SearchBar from '../Components/SearchBar';
import ListTaskPage from '../pages/Task/ListTaskPage';

function App() {


 
  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <SearchBar/>
      </Header>
      <Layout>      
        <ListTaskPage/>
      </Layout>
    </Layout>
  );
}

export default App;
