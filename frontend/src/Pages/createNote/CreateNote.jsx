import './createNote.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { createNote } from '../../Redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch()

    const { userLogin } = useSelector((state) => state.user)
    const { userInfo } = userLogin;
    
    const noteCreate = useSelector((state) => state.note)
    const { loading, error } = noteCreate

    const navigate = useNavigate();

    const submitCreateForm = async (e) => {
        e.preventDefault();

        let note = {title, content, category}
        
        createNote(userInfo, note, dispatch)
        
        if (!title || !content || !category) return;

        resetHandler();

        navigate('/notes')
    }

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }
  return (
    <div className='create'>
        <h1>Create a New Note</h1>
        {loading && <h1>Loading...</h1>}
        {error && <Alert type="error" message={error}/>}
        <div>
            <form className='createForm' onSubmit={submitCreateForm}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        placeholder='Enter the title' 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}  
                    />
                </div>
                
                <div className="form-group">
                    <label>Category</label>
                    <input 
                        type="text" 
                        placeholder='Enter the category'   
                        onChange={(e) => setCategory(e.target.value)} 
                        value={category}
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        type="text" 
                        placeholder='Begin typing your notes here...'  
                        onChange={(e) => setContent(e.target.value)} 
                        value={content} 
                    />
                </div>

                {content && 
                    <div className="form-group show-content">
                        <h1>Note Previewed</h1>
                        <div>
                            <ReactMarkdown>{content}</ReactMarkdown>

                        </div>
                    </div>
                }

                <div>
                    <button className='createNoteBtn'>
                        Create Note
                    </button>
                    <button className='createNoteBtn resetFieldsBtn' onClick={resetHandler}>
                        Reset Fields 
                    </button>
                </div>
                <div className='cardFooter'>
                    Creating on - {new Date().toLocaleDateString()}
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateNote