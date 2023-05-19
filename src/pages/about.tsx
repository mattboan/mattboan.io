import { Connect } from '@/comps/Connect';
import { Container } from '@/comps/Container';
import { Footer } from '@/comps/Footer';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import Head from 'next/head';
import Link from 'next/link';

const About = () => {
    return (
        <>
            <Head>
                <title>void - about</title>
                <meta
                    name="description"
                    content="Learn more about Matt (Void), a passionate developer driven by innovation and endless curiosity. Explore Matt's expertise in web development, side projects, and C++ SDL2 Games."
                />
            </Head>

            <main>
                {/* Header */}
                <VoidHeader />

                {/* Content  */}
                <Section id="about-me">
                    <Container>
                        <h1>matt boan</h1>
                        <p id="col-3">
                            Hey 👋 I'm Matt, I use void as a pseudonym online,
                            I'm currently working at{' '}
                            <a href="https://www.23rdst.com.au" target="_blank">
                                23rd Street Marketing
                            </a>{' '}
                            as a Software Developer where I strive for intuitive
                            software solutions within the proptech industry.
                        </p>
                        <p id="col-3">
                            I mostly work on the web, but I'm always working on
                            other things on the side; C++, Rust, SDL2, Embedded
                            Systems, Robotics, Game Development, etc.
                        </p>
                        <p>
                            Check out my <Link href="/projects">projects</Link>{' '}
                            to learn more. adios.
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
