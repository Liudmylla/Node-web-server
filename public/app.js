let noteInnerHtml = "";
let nowEdited = false;
let listElem = "";
function getSelect(value, id) {
  return `
  <input type="text" class="form-control me-3" value=${value}/>
<div class="d-flex">
  <button
    class="btn btn-success me-2"
    data-type="update"
    data-id=${id}
  >
    Сохранить
  </button>
  <button
    class="btn btn-danger"
    data-type="cancel"
    data-id=${id}
  >
  Отменить
  </button>
</div>`;
}

document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const type = event.target.dataset.type;
  listElem = event.target.closest("li");
  if (type === "remove") {
    remove(id).then(() => {
      listElem.remove();
    });
  } else if (type === "update") {
    const data = listElem.querySelector("input").value;
    console.log(data);
    if (!data) return;

    update(id, data);

    listElem.innerHTML = noteInnerHtml;
    listElem.querySelector("span").innerText = data;

    nowEdited = false;
    listElem = "";
  } else if (type === "edit") {
    if (nowEdited) return;
    nowEdited = true;

    noteInnerHtml = listElem.innerHTML;

    const inputValue = listElem.querySelector("span").innerText.trim();
    listElem.innerHTML = getSelect(inputValue, id);
  } else if (type === "cancel") {
    listElem.innerHTML = noteInnerHtml;
    nowEdited = false;
    listElem = "";
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
    body: JSON.stringify({ id: id, title: data }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
