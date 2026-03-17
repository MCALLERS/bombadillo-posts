// Explicit proxy for broken React build path
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { password } = body;
    
    // Check password from environment variable
    const correctPassword = env.DASHBOARD_PASSWORD || 'blueprint2026';
    
    if (password === correctPassword) {
      // Set session cookie (24 hour expiry)
      const sessionToken = crypto.randomUUID();
      
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `dashboard_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
    } else {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
