import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEntry, readEntry } from "./data";
// import type { UnsavedEntry } from "./data";

export function NewEntry() {
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState();
  const {entryId} = useParams();


  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newEntry = {title, photoUrl, notes};
    addEntry(newEntry)
    navigate('/');
  }

  useEffect(() => {
    async function loadEntry() {
      try {
        const entry = await readEntry(entryId)
        console.log(entry);
        // setEntries(entry);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    loadEntry();
  }, [])

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
        <button>Save</button>
      </form>
    </div>
  );
}
