import {Site} from "./Fields";

export const getPage = async (page, order, dir) => {
  const response = await fetch(Site + (order ? '/' + order : '') + '/page'
    + page + (order == null ? '' : '?dir=' + (dir ? '1' : '-1')))
  return await response.json();
}

export const getRow = async (id) => {
  return await fetch(Site + '/' + id, {method: 'GET'})
}

export const deleteRow = async (id) => {
  await fetch(Site + '/' + id, {method: 'DELETE'})
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
