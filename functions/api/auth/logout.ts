// POST /api/auth/logout
export async function onRequestPost(context) {
  // Clear session cookie by setting Max-Age=0
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'dashboard_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    }
  });
}
