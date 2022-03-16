import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleImg } from '../toggleSlice';
import './Event.css';

function Event(props) {
    const[imageArr, setImageArr] = useState([]);
    const[imgVisible, setImgVisible] = useState(false);
    const[currentImg, setCurrentImg] = useState("");
    const dispatch = useDispatch();


    const ImageTiles = (props) => {
        var imgPath = "https://azdriftarchiveserver.link/" + props.item;
        imgPath = imgPath.replace('/wwwroot', '');
        return (
            <div className='image-tiles' onClick={() => setSingleImage(imgPath)}>
                <img src={imgPath} />
            </div>
        )
    }

    const SingleImage = () => {
        return(
            <div className='single-image-container'>
                <div className='single-image'>
                    <img src={currentImg} />
                </div>
            </div>
        )
    }

    const setSingleImage = (imgPath) => {
        setCurrentImg(imgPath);
        setImgVisible(true);
    }
    
    const toggle = () => {
        dispatch(toggleImg())
    }

    useEffect( () => {
        var date = props.eventPath.substring(0,8);
        const setImages = () => {
            var newArr = [];
            var path = 'https://azdriftarchiveserver.link/api/GetDataFromEvent?eventDate=' + date;
            //var path = 'https://localhost:5000/api/GetDataFromEvent?eventDate=' + date;
            fetch(path)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    newArr.push(<ImageTiles key={i} item={data[i]} />)
                }
                setImageArr(newArr);
            })
        }
        setImages();
    }, [])


    return(
        <div className="event-page" >

            <div className='back-button'>
                <div className='date-box date-box-small' onClick={toggle}>🠔 back</div>
            </div>

            <div className='images'>
                { imageArr }
            </div>

            <div className='single-image-area' onClick={() => setImgVisible(false)}  >
                { imgVisible ? <SingleImage /> : "" }
            </div>

        </div>
    )
}

export default Event;