fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    data.forEach(user => {
      const div = document.createElement("div");
      div.className = "user";
      div.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
      userList.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById("userList").textContent = "Failed to load users.";
    console.error(err);
  });
