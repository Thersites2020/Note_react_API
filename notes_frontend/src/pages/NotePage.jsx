import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

function NotePage() {
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(function () {
    getNote();
  }, [id]);

  const getNote = async () => {
    if (id === 'new')  return;
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();
    console.log("Data = ", data)
    setNote(data);
  }

  const createNote = async () => {
    fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  const updateNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }
  
  const deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/');
    navigate(0);
  }

  function handleSubmit() {
    console.log(note)
    if (id !== 'new' && note.body === '') {
      deleteNote();
    }
    else if ( id !== 'new') {
      updateNote();
    }
    else if (id === 'new' && note.body !== null) {
      createNote();
    }
    navigate('/');
    navigate(0);
  }

  function handleChange(e) {
    // console.log('IN HANDLE CHANGE! ', e.target.value);
    setNote({...note, 'body': e.target.value});
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit}/>
        </h3>
        { id != 'new' 
          ? <button onClick={deleteNote}>Delete</button> 
          : <button onClick={handleSubmit}>Done</button> }
        
      </div>
      <textarea onChange={(e)=>handleChange(e)} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
