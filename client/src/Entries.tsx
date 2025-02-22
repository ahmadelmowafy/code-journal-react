import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { readEntries, type Entry } from "./data"

export default function Entries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      try {
        const newEntries = await readEntries()
        console.log(newEntries);
        setEntries(newEntries);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    loadEntries();
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
      <div className="flex items-center p-3 justify-between">
      <h1>Entries</h1>
      <Link to="details/new" className="">New</Link>
      </div>
      {entries.length ?
      <ul >
        {entries.map(entry => (<EntryCard entry={entry} key={entry.entryId}/>))}
      </ul> : <p>No entries have been recorded</p>}
    </div>

  )
}

type Props = {
  entry: Entry
}
function EntryCard({ entry }: Props) {
  return (
  <li className="flex flex-wrap p-3">
    <div className="w-1/2 ">
    <img className="" src={entry.photoUrl} alt={entry.title} />
    </div>
    <div className="w-1/2 text-left">
    <div className="flex justify-between">
    <h2>{entry.title}</h2>
    <Link to={`/details/${entry.entryId}`}>
    Edit
    </Link>
    </div>
    <p className="pt-3">{entry.notes}</p>
    </div>
  </li>
  );
}
