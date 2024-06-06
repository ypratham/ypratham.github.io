import { EmailTemplate } from '@/components/email-template';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend("re_5i2VDgew_3CwrCdEfxQNJKCd9j1UnRXBZ");

export async function POST(req: Request) {

    const payload: any = await req.json()

    console.log(payload)

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['ypratham0014@gmail.com'],
            subject: 'Connect from Portfolio',
            react: EmailTemplate({ fullName: payload?.name, email: payload?.email, message: payload?.message }) as React.ReactElement,

        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
