import axios from 'axios';
import { API_ROOT } from '../constants';
require('dotenv').config();

export const getGeocode = async function(location) {
    let address = location.address.split(' ').join('+');
    let city = location.city
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+LA&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    const response = await axios.get(url)
    const data = response.data.results[0]
    const coords = { 
        place_id: data.place_id, 
        address: data.formatted_address, 
        position: {
            lat: data.geometry.location.lat, 
            lng: data.geometry.location.lng
        }
    }
    return coords
}

export const getDistance = (data) => {
    let address = data.address.split(' ').join('+');
    let url = `https://maps.googleapis.com/maps/api/directions/json?
    origin=&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    debugger
    axios.get(url).then(r => console.log(r))
}


export const finalizeRoute = (data) => {
    const postObj = {
        locations: [...data.locations],
        mileage: data.mileage
    }
    return async (dispatch) => {
        dispatch({ type: 'START_LOAD' })
        const response = await axios.post(`${API_ROOT}/delivery_entries`, 
        postObj,
        { withCredentials: true  })
        const data = response.data
        // debugger
        dispatch({ type: 'END_LOAD' })
    }
}