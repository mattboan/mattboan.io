import styles from '@/styles/post.module.scss';
import { Container } from '@/comps/Container';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import { client } from '@/utils/supa';
import { format } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from '../_error';
import { Footer } from '@/comps/Footer';
import { SubscribeCta } from '@/comps/SubscribeCta';
import { Project } from '@/db/project.def';

const ProjectPost = ({ project }: { project: Project }) => {
    const router = useRouter();

    if (router.isFallback || !project?.published) {
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
                                {format(
                                    new Date(project.published),
                                    'dd-MM-yyyy'
                                )}{' '}
                                | by <span id="accent">matt boan</span>
                            </div>
                        )}
                    </Container>
                </Section>

                <Section id="post-content">
                    <Container>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: project.content || '',
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
    const { data } = await client
        .from('Project')
        .select('id')
        .not('published', 'is', null);

    const paths = data?.map((project) => ({
        params: {
            id: String(project.id),
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }: any) {
    const { data } = await client
        .from('Project')
        .select('*')
        .eq('id', params.id);

    return {
        props: {
            project: data?.[0] || null,
            revalidate: 60000,
        },
    };
}

export default ProjectPost;
