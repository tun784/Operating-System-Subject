import { Link } from "react-router-dom";

import './menu.scss'

const Menu = () => {
    return (
        <div className="menu">
            <div className="wrap">
                <h1 className="menu-title">Shortest Job First (SJF)</h1>
                <div className="option-1">
                    <span>
                        1. <Link to="/exclusive" className="option-link">Độc Quyền</Link>
                    </span>
                </div>
                <div className="option-2">
                    <span>
                        2. <Link to="/noexclusive" className="option-link">Không Độc Quyền</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Menu;