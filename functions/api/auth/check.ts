// GET /api/auth/check
export async function onRequestGet(context) {
  const { request } = context;
  
  // Check for session cookie
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
