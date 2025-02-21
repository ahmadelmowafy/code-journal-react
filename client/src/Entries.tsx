import { Link } from "react-router-dom"

export default function Entries() {
  return (
    <div>
      <h1>Entries</h1>
      <Link to="details/new">New</Link>
    </div>
  )
}
