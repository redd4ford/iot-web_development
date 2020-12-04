import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8090/door',
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function getAllByFilters(producer, price, height, color) {
    let url = `http://localhost:8090/door?`;
    if (producer !== undefined && producer !== '') {
      url += `producer=${producer}&`;
    }
    if (price !== undefined) {
      url += `price=${price}&`;
    }
    if (height !== undefined) {
      url += `height=${height}&`;
    } if (color !== undefined && color !== '') {
      url += `color=${color}&`;
    }
    return (await http.get(url)).data;
}

export async function getOne(id) {
    let url = `http://localhost:8090/door/${id}`;
    return (await http.get(url)).data;
}
