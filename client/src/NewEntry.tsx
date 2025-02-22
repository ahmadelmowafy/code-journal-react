import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEntry, readEntry } from "./data";
// import type { UnsavedEntry } from "./data";
import { updateEntry, removeEntry } from "./data";

export function NewEntry() {
  const [title, setTitle] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const {entryId} = useParams();
  const isEditing = entryId && entryId !== 'new';

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newEntry = {title, photoUrl, notes};
    if (!isEditing) addEntry(newEntry)
      else {
    const updatedEntry = {title, photoUrl, notes, entryId: +entryId}
    updateEntry(updatedEntry)
      }
    navigate('/');
  }

  useEffect(() => {
    async function loadEntry(id: number) {
      setIsLoading(true)
      try {
        const entry = await readEntry(id)
        console.log(entry);
        if (entry?.title) setTitle(entry.title)
        if (entry?.photoUrl) setPhotoUrl(entry.photoUrl)
        if (entry?.notes) setNotes(entry.notes)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) loadEntry(+entryId);

  }, [entryId, isEditing])

  function handleDelete() {
    if (!entryId) return
    removeEntry(+entryId)
    navigate('/')
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }



  return (
    <div>
      <h2>New Entry</h2>
      <img src={photoUrl || '/images/placeholder-image-square.jpg'} />
      <form onSubmit={handleSubmit}>
        <label>Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>Photo URL
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <label>Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
        </label>
        {isEditing && (<button onClick={handleDelete}>Delete</button>)}
        <button>Save</button>
      </form>
    </div>
  );
}
