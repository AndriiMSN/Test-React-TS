import {render} from "react-dom";
import {App} from './components/App'
import {createBrowserHistory} from "history";
import {Router} from 'react-router-dom'

render(
    <Router history={createBrowserHistory()}>
        <App/>
    </Router>,
    document.getElementById('root'));