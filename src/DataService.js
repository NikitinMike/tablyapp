import {Site} from "./Fields";

export const getPage = async (page, order, dir, size) => {
    // const response = await fetch(Site + (order ? '/' + order : '')
    //     + '/page' + page + (order == null ? '' : '?dir=' + (dir ? '1' : '-1')))
    const url = Site + '?page=' + (page ? page : 0)
        + '&size=' + (size ? 10 : size)
        + (order ? '&order=' + order : '')
        + (order == null ? '' : '&dir=' + (dir ? '1':'-1'))
    // console.log(url)
    const response = await fetch(url)
    return await response.json();
}

export const getRow = async (id) => {
    const response = await fetch(Site + '/' + id, {method: 'GET'})
    return await response.json();
}

export const deleteRow = async (id) => {
    await fetch(Site + '/' + id, {method: 'DELETE'})
}

export const putRow = async (row) => {
    // const row = this.state.row // s[this.state.index]
    await fetch(Site + '/' + row.id, {
        method: 'PUT',
        body: JSON.stringify(row),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(data => console.log(data))
        .catch(e => console.log(e))
}

export const addRow = async (row) => {
    await fetch(Site + '/', {
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(row)
    })
}
