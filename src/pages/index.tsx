import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '@/comps/Header';
import Link from 'next/link';
import { Button } from '@/comps/Button';

export default function Home() {
    return (
        <>
            <Head>
                <title>mattboan.io - Home</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* Header */}
                <Header logo="/img/logo.png">
                    <div className={styles.headerLinks}>
                        <Link href="/case-studies">Case Studies</Link>
                        <Link href="/blog">Blog </Link>
                        <Link href="/about">About </Link>
                    </div>
                    <Button>Let's Connect</Button>
                </Header>

                {/* Hero Section */}

                {/* Footer */}
            </main>
        </>
    );
}
