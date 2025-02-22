import { Link, Outlet } from "react-router-dom"

export default function Header() {
  return (
  <div>
    <nav className="header flex items-center p-3">
      <h1>Code Journal</h1>
      <ul>
        <li><Link to="/" className="text-white ml-3">Entries</Link></li>
      </ul>
    </nav>
    <Outlet />
  </div>
  )
}
