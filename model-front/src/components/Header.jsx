import { Link, useLocation } from "react-router-dom"
import '../App.css'

function Header() {
    const location = useLocation()

    return (
        <header className="site-header">
            <div className="header-inner">
                {/* 로고 */}
                <Link to="/" className="header-logo">
                    <div className="logo-icon">🌿</div>
                    <span className="logo-text">Forest<span>AI</span></span>
                </Link>

                {/* 네비게이션 */}
                <nav className="header-nav">
                    <Link
                        to="/"
                        className={`nav-link${location.pathname === '/' ? ' active' : ''}`}
                    >
                        🏡 홈
                    </Link>
                    <Link
                        to="/iris"
                        className={`nav-link${location.pathname === '/iris' ? ' active' : ''}`}
                    >
                        🌸 Iris 폼
                    </Link>
                    <Link
                        to="/tips"
                        className={`nav-link${location.pathname === '/tips' ? ' active' : ''}`}
                    >
                        💰 팁 폼
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header