import {Site} from "./Fields";

export const getPage = async (page, order, dir) => {
  const response = await fetch(Site + (order ? '/' + order : '') + '/page'
    + page + (order == null ? '' : '?dir=' + (dir ? '1' : '-1')))
  return await response.json();
}

export const deleteRow = async (index) => {
  await fetch(Site + '/' + this.state.row.id, {method: 'DELETE'})
  // .then(response => response.json())
  // .then(data => getPage(0))
  // .catch(e => console.log(e))
  // await getPage(0)
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
  // .then(response => response.json())
  // .then(res => getPage(0))
  // .catch(e => console.log(e))
  // await getPage(0)
}
