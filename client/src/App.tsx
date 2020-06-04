import React from 'react';
import './App.css';
import Search from './components/Search/Search';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import Table from './components/Table/Table';
import AddUser from './components/AddUser/AddUser';
import {Modal} from './components/Modal/Modal';
import EditUser from './components/EditUser/EditUser';

function App() {

  const [showAddUser, setShowAddUser] = React.useState(false);
  const [showEditUser, setShowEditUser] = React.useState(false);
  
  return (
    <div className="App">
      <Search />
      <ButtonGroup openEditUserModal={setShowEditUser} openAddUserModal={setShowAddUser} />
      <hr/>
      <Table />
      <Modal show={showAddUser} close={setShowAddUser}>
            <AddUser close={setShowAddUser} />
      </Modal>
      <Modal show={showEditUser} close={setShowEditUser}>
            <EditUser close={setShowEditUser} />
      </Modal>
    
    </div>
  );
}

export default App;
