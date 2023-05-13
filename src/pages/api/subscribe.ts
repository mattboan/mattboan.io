// import mailchimp from '@mailchimp/mailchimp_marketing';
import MailerLite from '@mailerlite/mailerlite-nodejs';
import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

// Create a new mailerliet instance
const mailerlite = new MailerLite({
    api_key: process.env.MAILERLITE_API_KEY || '',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const params = {
            email: email,
            ip_address: requestIp.getClientIp(req) || undefined,
            groups: ['88050833911973374'],
        };

        await mailerlite.subscribers.createOrUpdate(params);

        return res.status(201).json({ error: '' });
    } catch (error: any) {
        console.log('Failed to subscribe to newsletter: ', error);
        return res
            .status(500)
            .json({ error: error.message || error.toString() });
    }
};
