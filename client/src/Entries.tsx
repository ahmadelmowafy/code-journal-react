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
  }, []

  )

  return (
    <div>
      <h1>Entries</h1>
      <Link to="details/new">New</Link>
    </div>
  )
}
