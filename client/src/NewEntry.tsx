import { useState, FormEvent } from "react";
import { addEntry } from "./data";
import type { UnsavedEntry } from "./data";

export function NewEntry() {
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newEntry = {title, photoUrl, notes};
    addEntry(newEntry)
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
