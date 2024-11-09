import {Home, Plus, User} from "lucide-react";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
    <nav className="flex w-full bottom-0 fixed justify-around border-t p-4 bg-white">
        <Link to="/home">
            <button className="p-2">
                <Home className="w-6 h-6" />
            </button>
        </Link>
        <Link to="/upload">
            <button className="p-2">
                <Plus className="w-6 h-6" />
            </button>
        </Link>
        <Link to="/profile">
            <button className="p-2">
                <User className="w-6 h-6" />
            </button>
        </Link>
    </nav>
    )
}