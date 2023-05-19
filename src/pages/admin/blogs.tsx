import { AdminHeader } from '@/comps/AdminHeader';
import { BlogListCard } from '@/comps/BlogListCard';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { ListList } from '@/comps/ListList';
import { Section } from '@/comps/Section';
import { Blog } from '@/db/blog.def';
import { admin_client } from '@/utils/admin_supa';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

const OFFSET = 10;
const DEF_BLOG: Partial<Blog> = {
    heading: 'Untitled Blog',
};

/**
 * Admin view for getting the blogs
 */
const ViewBlogs = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState('');
    const [session, setSession] = useState<any>(null!);

    // Fetch the latest blogs
    const getBlogs = async () => {
        setLoading(true);

        const start = (page - 1) * OFFSET;
        const end = start + OFFSET - 1;

        const { data, error } = await admin_client
            .from('Blog')
            .select('*')
            .range(start, end);

        if (error) {
            setError('Failed to get the blogs');
        }

        if (page === 1) {
            setBlogs(data as Blog[]);
        } else {
            setBlogs([...blogs, ...(data as Blog[])]);
        }

        setLoading(false);
    };

    // Create new blog
    const createBlog = async () => {
        setCreating(true);

        const { data, error } = await admin_client
            .from('Blog')
            .insert(DEF_BLOG);

        setPage(1);

        setCreating(false);
    };

    useEffect(() => {
        getBlogs();
    }, [page]);

    useEffect(() => {
        admin_client.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push('/login');
            setSession(session);
        });

        admin_client.auth.onAuthStateChange((_event, session) => {
            if (!session) router.push('/login');
        });
    }, []);

    if (!session) return <>Loading...</>;

    return (
        <>
            <Head>
                <title>void - Admin - View Blogs</title>
                <meta name="robots" content="noindex" />
            </Head>
            <main>
                <AdminHeader />

                <Section id="admin-margin">
                    <Container>
                        <div className="flex-inline">
                            <Link href={`/blogs`} target="_blank">
                                View Blogs
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
                            {blogs.map((blog: Blog, i: number) => (
                                <BlogListCard
                                    blog={blog}
                                    href={`/admin/blogs/${blog.id}`}
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
