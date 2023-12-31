import { ReactComponent as AddIcon } from '../assets/add.svg';
import { Link } from 'react-router-dom';

function AddButton() {
  return (
    <Link to="/note/new" className='floating-button'>
      <AddIcon />
    </Link>
  )
}

export default AddButton
