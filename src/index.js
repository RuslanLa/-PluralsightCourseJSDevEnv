import numeral from 'numeral';
import './index.css';
import { getUsers, deleteUser } from './api/usersApi';
const value = numeral(1000).format('$0,0.00');
console.log(`Converted numeral value: ${value}`); //eslint-disable-line no-console
const convertUserToHtml = (user) => `<tr>
                                       <td><a href="#" data-id=${user.id} class="deleteUser">Delete</a></td>
                                       <td>${user.id}</td>
                                       <td>${user.firstName}</td>
                                       <td>${user.lastName}</td>
                                       <td>${user.email}</td>
                                     </tr>`
getUsers().then(users => {
  document.querySelector('#users>tbody').innerHTML = users.map(convertUserToHtml).join('');
  const tbody = document.querySelector('#users>tbody');
  document.querySelectorAll('.deleteUser').forEach(link => link.addEventListener('click', function () {
    const id = this.attributes['data-id'].value;
    deleteUser(id).then(() => {
      tbody.removeChild(this.parentNode.parentNode);
    })
  }));
});
