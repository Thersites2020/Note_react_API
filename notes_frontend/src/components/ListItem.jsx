import { Link } from 'react-router-dom';


function formatTime(note) {
  return new Date(note.updated).toLocaleDateString()
}

function getTitle (note) {
  let title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
}

function getContent(note) {
  let title = getTitle(note);
  let content = note.body.replaceAll('\n', '');
  content = content.replaceAll(title, '');

  if (content.length > 45) {
    return content.slice(0, 45) + '...';
  }
  else {
    return content;
  }
}

function ListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p><span>{formatTime(note)}</span></p>
      </div> 
    </Link>
  )
}

export default ListItem
