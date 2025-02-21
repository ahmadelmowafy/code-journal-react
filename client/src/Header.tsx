import { Link, Outlet } from "react-router-dom"

export default function Header() {
  return (
  <div>
    <h1>Code Journal</h1>
    <nav>
      <ul>
        <li><Link to="/entries" className="text-white">Entries</Link></li>
      </ul>
    </nav>
    <Outlet />
  </div>
  )
}
