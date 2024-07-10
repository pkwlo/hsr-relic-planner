async function deleteRelic(relicId: number) {
  console.log("Delete relic: " + relicId);
  const user = localStorage.getItem("email");
  try {
    const res = await fetch("/api/deleteRelic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, relicId }),
    });

    const data = await res.json();

    if (res.status === 200) {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error deleting relic:", error);
  }
}

export default deleteRelic;
