import { useState, FormEvent } from "react";
import { addEntry } from "./data";

export function NewEntry() {
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h2>New Entry</h2>
      <img src={photoUrl || '/images/placeholder-image-square.jpg'} />
      <form>
        <label>Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>Photo URL
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <label>Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
        </label>
      </form>
    </div>
  );
}
