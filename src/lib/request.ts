import axios from 'axios'

const request = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

export default request
