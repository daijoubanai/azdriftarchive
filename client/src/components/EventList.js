import { useState, useEffect } from 'react';
import './EventList.scss';
import Event from './Event';
import { useSelector, useDispatch } from 'react-redux';
import { toggleImg } from '../toggleSlice';


function EventList() {
    const[dateArr, setDateArr] = useState(["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"]);
    const[eventArr, setEventArr] = useState([]);
    const[eventPath, setEventPath] = useState("");
    const images = useSelector((state) => state.toggle.value);
    const months = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dispatch = useDispatch();
    

    const SingleEvent = (props) => {
        var item = props.item;
        var isDate = item.length > 7;

        if (isDate) {
            var month = months[parseInt((props.item).substring(4,6))];
            var date = month + " " + (props.item).substring(6,8) + ", " + (props.item).substring(0,4);
            item = date;
            var track = props.item.substring(8,11);
            switch(track) {
                case 'PIR':
                    track = "Phoenix International Raceway";
                    break;
                case 'FIR':
                    track = "Firebird Raceway";
                    break;
                case 'SIR':
                    track = "Southern International Raceway";
                    break;
                default:
                    console.log("location missing");
            }
        }

        return(
            <div className={isDate ? 'date-box date-box-large' : 'date-box date-box-small'} onClick={() => changeDates(props.item)}>
                { item } <br />
                { track }
            </div>
        )
    }

    const changeDates = (item) => {
        if (item === "🠔 back") {
            setDateArr(["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"]);
        }
        else if(item.length === 4){
            var path = 'https://azdriftarchiveserver.link/api/GetEventsByYear?eventYear=' + item;
            //var path = 'https://localhost:5000/api/GetEventsByYear?eventYear=' + item;  
            fetch(path)
            .then(res => res.json())
            .then(data => {
                var eventDateArr = [];
                eventDateArr.push("🠔 back");
                for (var i = 0; i < data.length; i++) {
                    eventDateArr.push(data[i].path + data[i].location)
                }
                setDateArr(eventDateArr);
            })
        }
        else {
            setEventPath(item);
            dispatch(toggleImg());
        }
    }

    useEffect( () => {
        const loadDates = () => {
            var len = dateArr.length;
            var newArr = [];
            for (var i = 0; i < len; i++) {
                var item = dateArr[i];
                newArr.push(<SingleEvent item={item} key={i} />)
            }
            setEventArr(newArr);
        }
        loadDates();
    }, [dateArr])

    
    return(
        <div className="event-list">
            
            <div className='date-list'>
                { images ? <Event eventPath={eventPath} /> : eventArr }
            </div>

        </div>
    )
}

export default EventList;