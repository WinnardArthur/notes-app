import './notes.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { deleteNote, listNotes } from '../../Redux/apiCalls';


const Notes = () => {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const noteList = useSelector(state => state.note)
  const { loading, error, notes } = noteList;

  const { userLogin } = useSelector(state => state.user)
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.note)

  const { success: successDelete } = noteDelete;

  const navigate = useNavigate();

  useEffect(() => {
    listNotes(userInfo, dispatch)
    if (!userInfo) {
      navigate('/')
    }

  }, [userInfo, navigate, dispatch, successDelete])
                
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteNote(userInfo, id, dispatch, setActive)
    }
    setTimeout(() => {
      setActive(false);
    }, 3000)

  }

  return (
    <div>
      <h1 className="welcome">Welcome back {userInfo && userInfo.name}</h1>

      <Link to="/createnote" className="createBtn">
        Create new Note
      </Link>
      {error && <Alert type="error" message={error} />}
      {loading && <h1>Loading...</h1>}

      {successDelete && active && <Alert type="success" message={successDelete}/>}

      {notes && notes.map((note) => (

        <div className="note" key={note._id}>
          <h2>{note.title}</h2>
          <i className='category'>Category - {note.category}</i>
          <div className="content"><ReactMarkdown>{note.content.substring(0, 300)}</ReactMarkdown></div>
          <div>
            <a href={`/notes/${note._id}`} className="createBtn editBtn">Edit</a>
            <button className="createBtn deleteBtn" onClick={() => deleteHandler(note._id)}>Delete</button>
          </div>
          <i className="date">Created on {note.createdAt.substring(0, 10)}</i>
        </div>
      ))}
    </div>
  );
};

export default Notes;
