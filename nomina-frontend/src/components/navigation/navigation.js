import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
        <a className="navbar-brand" >
          Página Inicial
        </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/personal">
              <a className="nav-link">
                Personal
              </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/rolDePago">
              <a className="nav-link">
                Rol de Pago
              </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/anticipo">
              <a className="nav-link">
                Anticipos
              </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cargo">
              <a className="nav-link">
                Cargo
              </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
