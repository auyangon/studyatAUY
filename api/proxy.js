const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxbE9fLOHjhJYBG-tq7sj9rmkQlMs83VrKgMbimPDLgJoc3ddItNc5EXUOXb2pfResULw/exec";

export default async function handler(req, res) {
  const params = new URLSearchParams(req.query || {});
  const endpoint = `${APPS_SCRIPT_URL}?${params.toString()}`;

  try {
    const upstream = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await upstream.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");

    if (!upstream.ok) {
      res.status(upstream.status).send(text);
      return;
    }

    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({
      error: "Proxy request failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
