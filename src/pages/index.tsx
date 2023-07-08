import Head from 'next/head';
import { Button } from '@/comps/Button';
import { Hero } from '@/comps/Hero';
import { Project } from '@/db/project.def';
import { CardList } from '@/comps/CardList';
import { ProjectCard } from '@/comps/ProjectCard';
import { Blog } from '@/db/blog.def';
import { BlogCard } from '@/comps/BlogCard';
import { SubscribeCta } from '@/comps/SubscribeCta';
import { Footer } from '@/comps/Footer';
import { VoidHeader } from '@/comps/VoidHeader';
import { useRouter } from 'next/router';
import { get_projects } from '@/utils/projects';
import { get_blogs } from '@/utils/blogs';
import { Section } from '@/comps/Section';
import { Container } from '@/comps/Container';
import { ModelViewer } from '@/comps/ModelViewer';

function Home({ projects, blogs }: { projects: Project[]; blogs: Blog[] }) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>void - home</title>
                <meta
                    name="description"
                    content="Filling the void, one line of code at a time. Passionate Developer | Driven by Innovation and Endless Curiosity."
                />
            </Head>
            <main>
                {/* Header */}
                <VoidHeader />

                {/* <Section>
                    <Container>
                        <div>3D Model Test</div>
                        <ModelViewer url="http://localhost:3000/models/pika.stl" />
                    </Container>
                </Section> */}

                {/* Hero Section */}
                <Hero>
                    <h1>
                        Filling the <span id="accent">void</span>, one line of
                        code at a time.
                    </h1>
                    <p>
                        Passionate Developer | Driven by Innovation and Endless
                        Curiosity.
                    </p>
                    <Button onClick={() => router.push('/about#connect')}>
                        Let's Connect
                    </Button>
                </Hero>

                {/* List of 6 projects I'm working on */}
                <CardList heading="Latest Projects" read_more="/projects">
                    {projects.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </CardList>

                {/* List of 6 blogs I'm working on */}
                <CardList heading="Latest Blog Posts" read_more="/blogs">
                    {blogs.map((blog: Blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </CardList>

                {/* Call to action */}
                <SubscribeCta />

                {/* Footer */}
                <Footer />
            </main>
        </>
    );
}

export async function getStaticProps() {
    const projects = (await get_projects()).slice(-6);
    const blogs = (await get_blogs()).slice(-6);

    // Filter out the published

    return {
        props: {
            projects: projects,
            blogs: blogs,
        },
    };
}

export default Home;
