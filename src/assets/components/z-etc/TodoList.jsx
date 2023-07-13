import React, { useState, useEffect } from 'react';

import axios from 'axios';
import moment from 'moment-timezone';

import editImg from '../images/icons/pen-to-square-solid.svg';
import deleteImg from '../images/icons/trash-solid.svg';
import emptyImage from '../images/empty.svg';

const TodoList = () => {
  // Set Data
  const [description, setDescription] = useState("");
  // Display Data
  const [todos, setTodos] = useState([]);
  // Search Filter
  const [search, setSearch] = useState("");
  // Start Date and End Date Filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Display Data
  useEffect(() => {
      // axios.get('http://127.0.0.1:8000/api/Alltodos')
      fetch("http://127.0.0.1:8000/api/Alltodos")
      .then(res=>{return res.json()})
      .then((response) => {
        setTodos(response.todos);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };
  // Create
  const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/api/create', { description })
      .then(() => {
        setDescription('');
        axios.get('http://127.0.0.1:8000/api/Alltodos')
        .then((response) => {
          setTodos(response.data.todos);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Update
  const handleEdit = (id) =>{
    const newDescription = prompt('Enter new description', todos.find(todo => todo.id === id).description);
    
    if (newDescription !== null) {
      const now = new Date().toISOString();
      axios.put(`http://127.0.0.1:8000/api/update/${id}`,{
        description: newDescription,
        updated_at: now,
      })
        .then(() => {
          const newTodos = [...todos];
          const index = newTodos.findIndex(todo => todo.id === id);
          newTodos[index].description = newDescription;
          newTodos[index].updated_at = now;
          setTodos(newTodos);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // Delete
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`)
      .then(() => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // Handle Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  // Handle Start Date Change
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Handle End Date Change
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Filter Code Search Start Date and End Date
  const filteredTodos = todos
    .filter((todo) => todo.description.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (startDate && endDate) {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).endOf("day");
        return moment(todo.created_at).isBetween(start, end);
      } else if (startDate) {
        const start = moment(startDate).startOf("day");
        return moment(todo.created_at).isSameOrAfter(start);
      } else if (endDate) {
        const end = moment(endDate).endOf("day");
        return moment(todo.created_at).isSameOrBefore(end);
      } else {
        return true;
      }
  });

  return (
    <>
      <div className="yot-overlay-mid-container">
        <div
          className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-700"
          style={{ maxHeight: '650px' }}
        >
          {/* Filter */}
          <div className="yot-row-m yot-mb-16">

            {/* Start Date */}
            <div className="yot-mb-4">
              <label htmlFor="startDate">
                <b>Start Date</b>
              </label>
              <input
                className={`yot-form-input yot-btn-shape-round`}
                type="date"
                placeholder="Search"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="yot-mlr-4"></div>

            {/* End Date */}
            <div className="yot-mb-4">
              <label htmlFor="endDate">
                <b>End Date</b>
              </label>
              <input
                className={`yot-form-input yot-btn-shape-round`}
                type="date"
                placeholder="Search"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>

            <div className='yot-mlr-4'></div>

            {/* Search */}
            <div className='yot-mb-4'>
              <label htmlFor="startDate"><b>Search</b></label>
              <input
                  className={`yot-form-input yot-btn-shape-round`}
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
              />
            </div>
          </div>

          {/* Title */}
          <div className="yot-flex yot-flex-ai-c-jc-sb yot-mb-16">
            <h2 className="yot-text-center yot-tc-blue1">Todo List</h2>
            <button className="yot-btn-blue1" onClick={handleCreate}>
              Add
            </button>
          </div>
  
          {/* Form Container */}
          <div className="yot-mb-16">
            <form onSubmit={handleSubmit}>
              <input
                className={`yot-form-input`}
                type="text"
                placeholder="Todo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          </div>
  
          {/* Data */}
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table className="yot-table-blue1-theme">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos.slice().reverse().map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.description}</td>
                    <td>{moment.tz(todo.created_at, 'UTC').tz('Asia/Manila').format('MMMM D, YYYY h:mm:ss A')}</td>
                      
                    <td>{moment.tz(todo.updated_at, 'UTC').tz('Asia/Manila').format('MMMM D, YYYY h:mm:ss A')}</td>
                    <td className='yot-flex yot-flex-ai-c-jc-se'>
                      <img className='yot-cursor-pointer' src={editImg} alt="Edit" style={{ width: '24px' }} onClick={() => handleEdit(todo.id)}/>
                      {' | '}
                      <img className='yot-cursor-pointer' src={deleteImg} alt="Delete" style={{ width: '24px' }} onClick={() => handleDelete(todo.id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTodos.length === 0 && (
              <div className="yot-mt-16 yot-text-center">
                <h3>No Todos Found</h3>
                <img src={emptyImage} alt="Empty Image"style={{ maxHeight: '150px' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList
