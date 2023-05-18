import { AdminHeader } from '@/comps/AdminHeader';
import { BlogListCard } from '@/comps/BlogListCard';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { ListList } from '@/comps/ListList';
import { ProjectListCard } from '@/comps/ProjectListCard';
import { Section } from '@/comps/Section';
import { Blog } from '@/db/blog.def';
import { Project } from '@/db/project.def';
import { admin_client } from '@/utils/admin_supa';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

const OFFSET = 10;
const DEF_PROJECT: Partial<Project> = {
    heading: 'Untitled Project',
};

/**
 * Admin view for getting the blogs
 */
const ViewBlogs = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState('');
    const [session, setSession] = useState<any>(null!);

    // Fetch the latest projects
    const getProjects = async () => {
        setLoading(true);

        const start = (page - 1) * OFFSET;
        const end = start + OFFSET - 1;

        const { data, error } = await admin_client
            .from('Project')
            .select('*')
            .range(start, end);

        if (error) {
            setError('Failed to get the blogs');
        }

        if (page === 1) {
            setProjects(data as Project[]);
        } else {
            setProjects([...projects, ...(data as Project[])]);
        }

        setLoading(false);
    };

    // Create new blog
    const createBlog = async () => {
        setCreating(true);

        const { data, error } = await admin_client
            .from('Project')
            .insert(DEF_PROJECT);

        setPage(1);

        setCreating(false);
    };

    useEffect(() => {
        getProjects();
    }, [page]);

    useEffect(() => {
        admin_client.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push('/login');
            setSession(session);
        });
    }, []);

    if (!session) return <>Loading...</>;

    return (
        <>
            <Head>
                <title>void - Admin - View Blogs</title>
                <meta name="description" content="TODO" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AdminHeader />

                <Section id="admin-margin">
                    <Container>
                        <div className="flex-inline">
                            <Link href={`/projects`} target="_blank">
                                View Projects
                            </Link>
                            <Button onClick={createBlog}>
                                {creating ? 'Creating...' : 'Create'}
                            </Button>
                        </div>
                    </Container>
                </Section>

                <Section id="admin-margin">
                    <Container>
                        {/* List out the blog posts */}
                        <ListList
                            heading="Blog Posts"
                            bottom_text="Load more"
                            onBottomClick={() => setPage(page + 1)}
                            loading={loading}
                        >
                            {projects.map((project: Project, i: number) => (
                                <ProjectListCard
                                    project={project}
                                    href={`/admin/projects/${project.id}`}
                                    key={i}
                                />
                            ))}
                        </ListList>

                        {error && <p id="error">{error}</p>}
                    </Container>
                </Section>
            </main>
        </>
    );
};

export default ViewBlogs;
