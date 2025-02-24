export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");

  if (!word) {
    return new Response(JSON.stringify({ error: "Word is required" }), { status: 400 });
  }

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    return new Response(JSON.stringify(data), { status: res.status });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
