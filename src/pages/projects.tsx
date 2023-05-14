import { CardList } from '@/comps/CardList';
import { Container } from '@/comps/Container';
import { Footer } from '@/comps/Footer';
import { ProjectCard } from '@/comps/ProjectCard';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import { Project } from '@/db/project.def';
import { client } from '@/utils/supa';
import Head from 'next/head';

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <>
            <Head>
                <title>void - projects</title>
                <meta name="description" content="TODO" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <VoidHeader />

                <CardList heading="Projects">
                    {projects.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </CardList>

                <Footer />
            </main>
        </>
    );
};

export async function getStaticProps() {
    const projects = await client.from('Project').select('*');

    return {
        props: {
            projects: projects.data,
        },
    };
}

export default Projects;
