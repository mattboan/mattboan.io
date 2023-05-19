import { Connect } from '@/comps/Connect';
import { Container } from '@/comps/Container';
import { Footer } from '@/comps/Footer';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import Head from 'next/head';

const About = () => {
    return (
        <>
            <Head>
                <title>void - about</title>
                <meta name="description" content="TODO" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {/* Header */}
                <VoidHeader />

                {/* Content  */}
                <Section id="about-me">
                    <Container>
                        <h1>matt boan</h1>
                        <p id="col-3">
                            Hey, I’m Matt, i use void as a psuedonym online to
                            showcase my work, and all of my projects. I’m
                            currently a Software Developer at 23rd Street
                            Marketing where I strive for intuitive software
                            solutions in real estate marketing.{' '}
                        </p>
                        <p id="col-3">
                            I mostly work professionally on the web, making
                            websites and web applications. My other side
                            projects include C++ SDL2 Games, etc.
                        </p>
                    </Container>
                </Section>

                <Connect />

                <Footer />
            </main>
        </>
    );
};

export default About;
