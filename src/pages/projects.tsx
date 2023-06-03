import { CardList } from '@/comps/CardList';
import { Container } from '@/comps/Container';
import { Footer } from '@/comps/Footer';
import { ProjectCard } from '@/comps/ProjectCard';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import { Project } from '@/db/project.def';
import { get_projects } from '@/utils/projects';
import { client } from '@/utils/supa';
import Head from 'next/head';

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <>
            <Head>
                <title>void - projects</title>
                <meta
                    name="description"
                    content="Explore all the Void projects, including web development, C++ SDL2 Games, and other exciting endeavors. Discover innovative software solutions and dive into creative projects firsthand."
                />
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
    const projects = await get_projects();

    return {
        props: {
            projects: projects,
        },
    };
}

export default Projects;
