const USERS_LIST = "usersList";
let users = [];

document
  .getElementById("form-user")
  .addEventListener("submit", function (event) {
    event?.preventDefault();
  });

function addUser() {
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");

  if (users.some((user) => user.email === emailInput.value))
    return window.alert(`Email (${emailInput.value}) ja existente!`);

  users.push({
    name: nameInput.value,
    email: emailInput.value,
    id: users.length + 1,
  });
  localStorage.setItem(USERS_LIST, JSON.stringify(users));

  loadList();
}

function getUsersStored() {
  const storedList = JSON.parse(localStorage.getItem(USERS_LIST));
  users = storedList || [];
}

getUsersStored();

function loadList() {
  var userListElement = document.getElementById("users-list");
  userListElement.innerHTML = "";

  users.forEach(function (user) {
    var listItem = document.createElement("tr");

    listItem.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser(${user.id})">
          Excluir
        </button>
      </td>
    `;
    userListElement.appendChild(listItem);
  });
}

loadList();

function deleteUser(userId) {
  const updatedUserList = users.filter((user) => user.id !== userId);

  if (users.some((user) => String(user.id) === userId))
    return alert("Usuario não encontrado!");

  users = updatedUserList;
  localStorage.setItem(USERS_LIST, JSON.stringify(users));
  loadList();
}

function deleteAllUsers() {
  users = [];
  localStorage.removeItem(USERS_LIST);
  loadList();
}

function search() {
  const searchInput = document.getElementById("search");
  const storedUsers = JSON.parse(localStorage.getItem(USERS_LIST));

  const matchExactly = storedUsers.filter((storedUser) =>
    Object.entries(storedUser)?.some((user) => {
      return String(user[1]).toLowerCase() === searchInput.value;
    })
  );
  const matchNotExactly = storedUsers.filter((storedUser) =>
    Object.entries(storedUser)?.some((user) =>
      String(user[1]).toLowerCase().includes(searchInput.value)
    )
  );

  if (!searchInput.value) users = storedUsers;
  else users = matchExactly.length ? matchExactly : matchNotExactly;

  loadList();
}
