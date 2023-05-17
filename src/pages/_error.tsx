import { Footer } from '@/comps/Footer';
import { VoidHeader } from '@/comps/VoidHeader';
import Head from 'next/head';

export default function Error() {
    return (
        <>
            <Head>
                <title>void - 404</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <VoidHeader />

                <div className="not-found">
                    <h2>404</h2>
                    <p>Oh oh page not found.</p>
                </div>

                <Footer />
            </main>
        </>
    );
}
