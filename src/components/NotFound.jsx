import {
  NavLink
} from 'react-router-dom'



export default function NotFound() {
  return(
    <main>

      <h1>404</h1>
      <p>
        page not found <NavLink to="/">back to Home</NavLink>
      </p>
    </main>
  )
}