const Site = 'http://localhost:3000/contacts',
  Headers = ['№', 'Имя', 'Фамилия', 'Электронная Почта', 'Телефон', 'Адрес', 'Паспорт'],
  Footers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт'],
  Fields = ['firstName', 'lastName', 'email', 'phone', 'city', 'country'],
  Size = [4, 7, 16, 10, 9, 3];

const getPage = async (page, order, dir, size) => {
  const url = Site + '?page=' + (page ? page : 0)
    + '&size=' + (size ? size : 10)
    + (order ? '&order=' + order : '')
    + (order == null ? '' : '&dir=' + (dir ? '1' : '-1'))
  // console.log(url)
  const response = await fetch(url)
  return await response.json();
}

const getRow = async (id) => {
  const response = await fetch(Site + '/' + id, {method: 'GET'})
  return await response.json();
}

const deleteRow = async (id) => {
  await fetch(Site + '/' + id, {method: 'DELETE'})
}

const putRow = async (row) => {
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

const addRow = async (row) => {
  await fetch(Site + '/', {
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(row)
  })
}
export const DataService = {
  Fields, Headers, Footers,Size,
  getPage,
  getRow,
  deleteRow,
  putRow,
  addRow,
}