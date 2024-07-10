async function getRelics(user: any) {
  try {
    const res = await fetch("/api/getRelics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error getting relics:", error);
  }
}

export default getRelics;
