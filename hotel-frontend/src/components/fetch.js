export async function fetchGet(getURL) {
  let response = await fetch(getURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

export async function fetchDelete(DeleteURL) {
  let response = await fetch(DeleteURL, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

export async function fetchPost(postURL, postData) {
  let response = await fetch(postURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

export async function fetchPut(putURL, putData) {
  let response = await fetch(putURL, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(putData)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}
