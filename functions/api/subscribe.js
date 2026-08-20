export async function onRequestPost(context) {
  const { env, request } = context;

  let email;
  try {
    const body = await request.json();
    email = body.email?.trim().toLowerCase();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Please enter a valid email address.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const existing = await env.DB.prepare('SELECT id FROM subscribers WHERE email = ?').bind(email).first();
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "You're already on the list!" }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare('INSERT INTO subscribers (email) VALUES (?)').bind(email).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
