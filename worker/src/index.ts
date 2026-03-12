import jwt from '@tsndr/cloudflare-worker-jwt';

export interface Env {
  GOOGLE_API_KEY: string;
  SHEET_ID: string;
  JWT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      if (url.pathname === '/') {
        return new Response(JSON.stringify({ 
          message: 'AUY Portal Worker is running!',
          status: 'ok'
        }), { headers });
      }

      if (url.pathname === '/api/login' && request.method === 'POST') {
        const { email, password } = await request.json();
        return new Response(JSON.stringify({
          success: true,
          message: 'Login endpoint working',
          email
        }), { headers });
      }

      return new Response(JSON.stringify({ error: 'Not found' }), { 
        status: 404, headers 
      });

    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500, headers 
      });
    }
  }
};
