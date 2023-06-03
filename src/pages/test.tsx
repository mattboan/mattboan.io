import { Connect } from '@/comps/Connect';
import { Container } from '@/comps/Container';
import { Footer } from '@/comps/Footer';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import Head from 'next/head';
import Link from 'next/link';

import { Markdown } from '@/comps/Markdown';

const Test = (props: any) => {
    return (
        <>
            <Head>
                <title>void - test</title>
            </Head>

            <main>
                <VoidHeader />

                <Section>
                    <Container>
                        <h2>Testing area</h2>
                        <Markdown markdown={props.markdown} />
                    </Container>
                </Section>

                <Footer />
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const fs = require('fs');
    const path = require('path');



    // Get the file path
    const file_path = path.join(process.cwd(), '/projects/posts/1.md');

    // Read the file contents
    const file = fs.readFileSync(file_path, 'utf-8');

    return {
        props: {
            markdown: file,
        },
    };
}

export default Test;
