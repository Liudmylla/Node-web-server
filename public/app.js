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
        event.target.closest("li").querySelector(".flex-grow-1").innerText =
          title;
      });
    }
  } else if (event.target.dataset.type === "removeHidden") {
    const buttons = document.querySelector(".buttons");
    buttons.removeAttribute("hidden");
    const primary = document
      .querySelector("#primary")
      .setAttribute("hidden", true);
    const select = document.createElement("select");
  } else if (event.target.dataset.type === "addHidden") {
    const buttons = document.querySelector(".buttons");
    buttons.setAttribute("hidden", true);
    const primary = document.querySelector("#primary");
    primary.removeAttribute("hidden");
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
