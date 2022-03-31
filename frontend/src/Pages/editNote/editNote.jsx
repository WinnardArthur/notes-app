import { useState } from "react"; 
import "./editNote.css";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../Redux/apiCalls";
import Alert from "../../components/Alert/Alert";

const EditNote = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState("");


    const { id } = useParams();

    const { userInfo } = useSelector((state) => state.user.userLogin)
    const noteUpdate = useSelector((state) => state.note)

    const { loading, error }= noteUpdate;

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const noteInfo = {title, content, category}

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`, config);

            setTitle(data.title)
            setContent(data.content)
            setCategory(data.category)
            setDate(data.updateAt);
        }

        fetching();
    }, [id, userInfo, date])

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const submitCreateForm = async (e) => {
        e.preventDefault();

        updateNote(userInfo, id, noteInfo, dispatch)

         
        resetHandler();

        window.location.replace('/notes')
    }

    return (
    <div className="create">
        <h1>Edit your Note</h1>
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
                        Update Note
                    </button>
                    <button className='createNoteBtn resetFieldsBtn' >
                        Delete Note
                    </button>
                </div>
                <div className='cardFooter'>
                    Updated on - {date}
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditNote