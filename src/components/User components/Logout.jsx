import cookie from 'react-cookies';
import Axios from 'axios';

export default function Logout() {
    cookie.remove('x-auth-token');
    Axios.get('http://localhost:3100/api/logout');
    setTimeout(Render(), 200);

    function Render() {
        window.location.href = '/';
    }
}