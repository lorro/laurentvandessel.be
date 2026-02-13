import { z } from 'astro/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0),
});

export async function POST({ request }) {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      honeypot: formData.get('honeypot')?.toString() || '',
    };

    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = {};
      for (const error of result.error.issues) {
        const field = error.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(error.message);
      }
      return new Response(
        JSON.stringify({ success: false, errors: fieldErrors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (result.data.honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const { error: resendError } = await resend.emails.send({
        from: 'Laurent Van Dessel <onboarding@resend.dev>',
        to: 'vandessel.laurent@gmail.com',
        replyTo: result.data.email,
        subject: result.data.subject
          ? `[Contact] ${result.data.subject}`
          : `[Contact] Message from ${result.data.name}`,
        text: `Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`,
        html: `
          <p><strong>Name:</strong> ${result.data.name}</p>
          <p><strong>Email:</strong> ${result.data.email}</p>
          <hr />
          <p>${result.data.message.replace(/\n/g, '<br />')}</p>
        `,
      });

      if (resendError) {
        console.error('Resend error:', resendError);
        return new Response(
          JSON.stringify({ success: false, errors: { form: [resendError.message] } }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      console.log('[DEV] Contact form submission (no RESEND_API_KEY):', data);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, errors: { form: ['An unexpected error occurred'] } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
