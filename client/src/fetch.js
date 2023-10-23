export default async function (
  url,
  _method,
  postData = null,
  token = null,
  selectedUser = null
) {
  const method = _method.toUpperCase();
  const request = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
      "selected-user": selectedUser ? selectedUser : null,
    },
    body: method === "POST" && postData ? JSON.stringify(postData) : null,
  });
  const response = await request.json();
  return response.data;
}
