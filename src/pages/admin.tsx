import { AdminHeader } from '@/comps/AdminHeader';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { Section } from '@/comps/Section';
import { admin_client } from '@/utils/admin_supa';
import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Home page for the admin
 */
const AdminHome = () => {
    const router = useRouter();
    const [session, setSession] = useState<any>(null!);

    const logout = () => {
        admin_client.auth.signOut();
    };

    useEffect(() => {
        admin_client.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push('/login');
            setSession(session);
        });

        admin_client.auth.onAuthStateChange((_event, session) => {
            if (!session) router.push('/login');
        });
    }, []);

    if (!session) return <>Loading...</>;

    return (
        <>
            <Head>
                <title>void - Admin</title>
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
                        <div className="flex-downline">
                            <Link href="/admin/blogs">Blogs</Link>
                            <Link href="/admin/projects">Projects</Link>
                            <Button onClick={() => logout()}>Log out</Button>
                        </div>
                    </Container>
                </Section>
            </main>
        </>
    );
};

export default AdminHome;
