import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

function NotesListPage() {
  const [notes, setNotes] = useState([]);
  useEffect(function() {
    getNotes();
  }, [])

  let getNotes = async ()=>{
    let response = await fetch('/api/notes/');
    let data = await response.json();
    setNotes(data);
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>
          &#9782; Notes
        </h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
          { notes.map(function (note, index) {
              return (
                <ListItem key={index} note={note}/>
              )
          })}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage
