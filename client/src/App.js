import EventList from './components/EventList';
import './App.css';

function App() {

    return(
        <div className='app'>

            <div className='header-container'>
                <div className='title'>
                    <h2>AZ Drift Event Archive</h2>
                </div>
                <div className='description'>
                    A collection on photos I've taken at Arizona drift events over the years.
                </div>
                <hr />
            </div>

            <div className='event-container'>
                <EventList />
            </div>

        </div>
    )
}

export default App;