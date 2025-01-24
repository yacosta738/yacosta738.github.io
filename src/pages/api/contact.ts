export const prerender = false;

import type { APIRoute } from 'astro';
import type { APIContext } from 'astro';

const hCaptchaVerifyUrl = 'https://hcaptcha.com/siteverify';

export const POST: APIRoute = async ({ request }: APIContext) => {
  try {
    const data = await request.formData();

    // Extract form fields
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const subject = data.get('subject')?.toString();
    const message = data.get('message')?.toString();
    const captcha = data.get('h-captcha-response')?.toString();

    // Validate required fields
    if (!name || !email || !subject || !message || !captcha) {
      return new Response(
        JSON.stringify({
          status: '400 Bad Request',
          message: 'Missing required fields: name, email, subject, message, captcha',
        }),
        { status: 400 }
      );
    }

    // Verify hCaptcha
    if (!import.meta.env.HCAPTCHA_SECRET || !import.meta.env.HCAPTCHA_SITE_KEY) {
      return new Response(
        JSON.stringify({
          status: '401 Unauthorized',
          message: 'Missing hCaptcha configuration',
        }),
        { status: 401 }
      );
    }

    const captchaVerified = await verifyHcaptcha(
      captcha,
      request.headers.get('cf-connecting-ip') || '',
      import.meta.env.HCAPTCHA_SECRET,
      import.meta.env.HCAPTCHA_SITE_KEY
    );

    if (!captchaVerified) {
      return new Response(
        JSON.stringify({
          status: '400 Bad Request',
          message: 'Invalid captcha verification',
        }),
        { status: 400 }
      );
    }

    // Send Discord notification
    if (import.meta.env.DISCORD_WEBHOOK_URL) {
      await sendDiscordMessage(name, email, subject, message, import.meta.env.DISCORD_WEBHOOK_URL);
    }

    return new Response(
      JSON.stringify({
        message: 'Success',
        response: {
          name,
          email,
          subject,
          message,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: '500 Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      { status: 500 }
    );
  }
};

async function verifyHcaptcha(
  response: string,
  ip: string,
  secret: string,
  siteKey: string
): Promise<boolean> {
  const res = await fetch(hCaptchaVerifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${response}&remoteip=${ip}&secret=${secret}&sitekey=${siteKey}`,
  });

  const json = await res.json();
  return json.success === true;
}

async function sendDiscordMessage(
  name: string,
  email: string,
  subject: string,
  message: string,
  webhookUrl: string
): Promise<void> {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'Website Contact Form',
      embeds: [
        {
          title: 'New Message',
          type: 'rich',
          fields: [
            { name: 'Name', value: name },
            { name: 'Email', value: email },
            { name: 'Subject', value: subject },
            { name: 'Message', value: message },
          ],
        },
      ],
    }),
  });
}
