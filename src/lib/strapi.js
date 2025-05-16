export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`);
  const data = await response.json();

  const res = {};
  data.data.forEach(({ title, content, slug, updatedAt }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: "POST",
    headers: {
      Authorization:
        "bearer 493d05a773454dcb929a2eadf460608e464009eaf13ce704d00ede0e60e725d71ca70b80ce4f1e147b8796e22fa524298347a708060e10f664d373094babf280c5c9008c273b862ffa39aee70a3381714efc46aeade6289252e53b6d02ad36198e95b4a6a1f506ebcdc76dbe1c8422f5985decc54e28c550c30a0acd24d4d616",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.slug;
}

export async function updateNote(uuid, data) {
  const { documentId } = await getNote(uuid);
  const parseData = JSON.parse(data);
  delete parseData.slug;
  const response = await fetch(
    `http://localhost:1337/api/notes/${documentId}`,
    {
      method: "PUT",
      headers: {
        Authorization:
          "bearer 493d05a773454dcb929a2eadf460608e464009eaf13ce704d00ede0e60e725d71ca70b80ce4f1e147b8796e22fa524298347a708060e10f664d373094babf280c5c9008c273b862ffa39aee70a3381714efc46aeade6289252e53b6d02ad36198e95b4a6a1f506ebcdc76dbe1c8422f5985decc54e28c550c30a0acd24d4d616",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: parseData,
      }),
    }
  );
  const res = await response.json();
  console.log(res);
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data?.data[0]?.title,
    content: data?.data[0]?.content,
    updateTime: data?.data[0]?.updatedAt,
    id: data?.data[0]?.id,
    documentId: data?.data[0]?.documentId,
  };
}

export async function delNote(uuid) {
  const { documentId } = await getNote(uuid);
  const response = await fetch(
    `http://localhost:1337/api/notes/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "bearer 493d05a773454dcb929a2eadf460608e464009eaf13ce704d00ede0e60e725d71ca70b80ce4f1e147b8796e22fa524298347a708060e10f664d373094babf280c5c9008c273b862ffa39aee70a3381714efc46aeade6289252e53b6d02ad36198e95b4a6a1f506ebcdc76dbe1c8422f5985decc54e28c550c30a0acd24d4d616",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 204) {
    console.log("删除成功");
  }
  return {
    message: "删除成功",
  };
  // const res = await response.json();
  // console.log(res);
}
