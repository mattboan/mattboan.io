import { AdminHeader } from '@/comps/AdminHeader';
import styles from '@/styles/login.module.scss';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { Input } from '@/comps/Input';
import { Section } from '@/comps/Section';
import { VerticalForm } from '@/comps/VerticalForm';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { admin_client } from '@/utils/admin_supa';
import { useRouter } from 'next/router';
import { PropagateLoader } from 'react-spinners';

/**
 * Home page for the admin
 */
const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle logging the user in
    const login = async () => {
        setLoading(true);
        setError('');

        const { data, error } = await admin_client.auth.signInWithPassword({
            email: email,
            password: pw,
        });

        if (error) {
            console.error('Failed to login: ', error);
            setError('Failed to login.');
        }

        if (data?.session) router.push('/admin');
        console.log('Got the data: ', data);
        setLoading(false);
    };

    // Watch the users input for the enter key

    return (
        <>
            <Head>
                <title>void - login</title>
                <meta name="description" content="TODO" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AdminHeader />

                <Section>
                    <Container>
                        <div className={styles.login_container}>
                            <VerticalForm>
                                <h2>Login</h2>
                                <Input
                                    label="Email"
                                    value={email}
                                    onChange={setEmail}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    value={pw}
                                    onChange={setPw}
                                />
                                {loading ? (
                                    <div className="center-me">
                                        <PropagateLoader color="#fff" />
                                    </div>
                                ) : (
                                    <Button onClick={() => login()}>
                                        Login
                                    </Button>
                                )}
                                {error && <p id="error">{error}</p>}
                            </VerticalForm>
                        </div>
                    </Container>
                </Section>
            </main>
        </>
    );
};

export default Login;
