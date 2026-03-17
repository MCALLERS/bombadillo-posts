// Catch-all proxy for broken React build paths (/port/5000/api/...)
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Strip /port/5000 prefix and forward to real API
  const newPath = url.pathname.replace(/^\/port\/5000/, '');
  url.pathname = newPath;
  
  // Forward the request
  const response = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined
  });
  
  return response;
}
