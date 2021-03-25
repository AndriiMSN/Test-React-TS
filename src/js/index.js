import {render} from "react-dom";
import {App} from './components/App'
import {createBrowserHistory} from "history";
import {Router} from 'react-router-dom'

const history = createBrowserHistory()

render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root'));