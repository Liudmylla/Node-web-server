document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      // event.target.parentNode.remove()
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "update") {
    const title = prompt("Введите новое название");
    if (title) {
      let data = {
        id: id,
        title: title,
      };
      update(id, data).then(() => {
        event.target.closest("li").remove();
        let updatedItem = document.createElement("li");
        updatedItem.innerText = title;
        event.target.closets("li").appendChild(updatedItem);
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function update(id, data) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
