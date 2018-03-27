import axios from 'axios'

const instance = axios.create({
    baseURL:'https://reactburger-9da07.firebaseio.com/'
})

export default instance