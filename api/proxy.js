const APPS_SCRIPT_TARGET = process.env.APPS_SCRIPT_URL || process.env.VITE_APPS_SCRIPT_URL;

function addCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function buildSearchParams(source) {
  const params = new URLSearchParams();

  Object.entries(source || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, String(entry)));
      return;
    }

    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params;
}

export default async function handler(req, res) {
  addCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (!APPS_SCRIPT_TARGET) {
    res.status(500).json({ success: false, error: "Missing APPS_SCRIPT_URL or VITE_APPS_SCRIPT_URL." });
    return;
  }

  try {
    const url = new URL(APPS_SCRIPT_TARGET);
    const isGet = req.method === "GET";

    if (isGet) {
      buildSearchParams(req.query).forEach((value, key) => url.searchParams.set(key, value));
    }

    const contentType = req.headers["content-type"] || "application/json";
    const requestInit = {
      body: undefined,
      headers: { "Content-Type": contentType },
      method: isGet ? "GET" : "POST",
    };

    if (!isGet) {
      if (typeof req.body === "string") {
        requestInit.body = req.body;
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        requestInit.body = buildSearchParams(req.body).toString();
      } else {
        requestInit.body = JSON.stringify(req.body || {});
      }
    }

    const response = await fetch(url.toString(), requestInit);
    const text = await response.text();
    const responseType = response.headers.get("content-type") || "application/json";

    res.status(response.status);
    res.setHeader("Content-Type", responseType);
    res.send(text);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unable to proxy the Apps Script request.",
    });
  }
}