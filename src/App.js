import './App.css';
import StudentCollection from './components/studentCollection';
import { useEffect, useState } from 'react';

function App() {
  var [studentData, setStudentData]=useState([]);
  var [currentStudent, setCurrentStudent]=useState({});

  function loadData(){
    fetch("http://localhost:5000/api/students")
    .then((resp) => resp.json()) 
    .then(function(data) {
      setStudentData(data);
      setCurrentStudent({...currentStudent,  name: "", id: ""});
    })
  }

  function addNewStudent(data){
    fetch("http://localhost:5000/api/student",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(loadData);
  }

  function updateStudent(id){
    fetch(`http://localhost:5000/api/student/${id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(currentStudent)
    })
    .then(loadData);
  }

  function deleteStudent(){
    fetch(`http://localhost:5000/api/student/${currentStudent.id}`,{
      method: 'DELETE'
    })
    .then(loadData);
  }

  function selectRow(row){
    setCurrentStudent(row);
    console.log(row)
  }

  useEffect(()=>{
    loadData();
  },[])

  function onAddNew(){
    setCurrentStudent({...currentStudent,  name: "", id: ""});
  }

  function getId(){
    return studentData.length === 0? 0 : Math.max(...studentData.map(i=>parseInt(i.id))) + 1;
  }

  function onSave(){
    if(!currentStudent.name || studentData.find(i=>i.name === currentStudent.name)){
      alert("Student name is be empty or already existed, please check input data!")
      return;
    }

    if(!currentStudent.id){
      addNewStudent({
        id: getId().toString(),
        name: currentStudent.name
      })
    }else{
      updateStudent(currentStudent.id);
    }
  }

  return (
    <div className="App">
      <StudentCollection data={studentData} 
                         onDelete={deleteStudent} 
                         onSelect={selectRow} 
                         onAddNew={onAddNew}/>
      <section className="add-new-student">
        <input type="text" 
               placeholder="Enter student name" 
               value={currentStudent.name} 
               onChange={e=>setCurrentStudent({ ...currentStudent, name: e.target.value })}/>
        <input type="button" value="Save" onClick={onSave}/>
        <input type="button" value="Delete" disabled={!currentStudent.id} onClick={deleteStudent}/>
      </section>
    </div>
  );
}

export default App;
