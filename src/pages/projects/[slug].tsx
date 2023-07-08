import styles from '@/styles/post.module.scss';
import { Container } from '@/comps/Container';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from '../_error';
import { Footer } from '@/comps/Footer';
import { SubscribeCta } from '@/comps/SubscribeCta';
import { Project } from '@/db/project.def';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import prism from 'remark-prism';
import { get_project_by_slug, get_projects } from '@/utils/projects';

const ProjectPost = ({ project }: { project: Project }) => {
    const router = useRouter();

    if (router.isFallback || !project?.published || !project) {
        return <Error />;
    }

    return (
        <>
            <Head>
                <title>void - {project.heading}</title>
                <meta name="description" content={project.overview} />
            </Head>
            <main>
                <VoidHeader />

                <Section id="header-img">
                    <Container>
                        {project.header_img && (
                            <Image
                                className={styles.header_image}
                                src={project.header_img}
                                width={1000}
                                height={800}
                                alt={`${project.heading} Image`}
                            />
                        )}
                        <h1 className={styles.heading}>{project.heading}</h1>
                        <h2 className={styles.sub_heading}>
                            {project.sub_heading}
                        </h2>
                        {project.published && (
                            <div className={styles.published}>
                                {project.date} | by{' '}
                                <span id="accent">matt boan</span>
                            </div>
                        )}
                    </Container>
                </Section>

                <Section id="post-content">
                    <Container>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: project?.content || '',
                            }}
                        ></div>
                    </Container>
                </Section>

                <SubscribeCta />

                <Footer />
            </main>
        </>
    );
};

export async function getStaticPaths() {
    const projects = await get_projects();

    const paths = projects.map((project: any) => ({
        params: {
            slug: project.slug,
        },
    }));

    console.log('Got the paths: ', paths);

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const fs = require('fs');
    const path = require('path');

    let project = null;

    try {
        project = await get_project_by_slug(params?.slug);


        console.log('Got the project: ', project);

        if (!project) {
            return {
                notFound: true,
            };
        }

        // Get the file path
        const file_path = path.join(process.cwd(), project.post_content_path);
        const temp = fs.readFileSync(file_path, 'utf-8');

        const matter_result = matter(temp);
        const parsed = await remark()
            .use(prism)
            .use(html, { sanitize: false }) // allow all HTML at your own risk
            .process(matter_result.content);

        project.content = parsed.toString();
    } catch (err) {
        console.error('Failed to load the file.', err);
    }

    return {
        props: {
            project: project,
            revalidate: 60000,
        },
    };
}

export default ProjectPost;
