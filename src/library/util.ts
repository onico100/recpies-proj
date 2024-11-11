export function saveToLocalStorage(value: any) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem("favorit", jsonValue);
}

export function getFromLocalStorage() {
  const jsonValue = localStorage.getItem("favorit");
  return jsonValue ? JSON.parse(jsonValue) : null;
}
