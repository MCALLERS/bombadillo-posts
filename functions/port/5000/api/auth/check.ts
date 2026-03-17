// Explicit proxy for broken React build path
export async function onRequestGet(context) {
  const { request, env } = context;
  
  // Just check the cookie and return
  const cookieHeader = request.headers.get('Cookie');
  const hasSession = !!(cookieHeader && cookieHeader.includes('dashboard_session='));
  
  return new Response(JSON.stringify({ authenticated: hasSession }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
}
