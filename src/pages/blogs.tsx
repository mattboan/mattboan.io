import { BlogCard } from '@/comps/BlogCard';
import { CardList } from '@/comps/CardList';
import { Footer } from '@/comps/Footer';
import { VoidHeader } from '@/comps/VoidHeader';
import { Blog } from '@/db/blog.def';
import { client } from '@/utils/supa';
import Head from 'next/head';

const Blogs = ({ blogs }: { blogs: Blog[] }) => {
    return (
        <>
            <Head>
                <title>void - blogs</title>
                <meta
                    name="description"
                    content="Explore a collection of insightful blogs by Matt (Void) covering various topics including web development, software trends, and industry insights. Stay informed and gain valuable knowledge in the world of development."
                />
            </Head>

            <main>
                <VoidHeader />

                <CardList heading="Blogs">
                    {blogs.map((blog: Blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </CardList>

                <Footer />
            </main>
        </>
    );
};

export async function getStaticProps() {
    const blogs = await client
        .from('Blog')
        .select('*')
        .not('published', 'is', null);

    return {
        props: {
            blogs: blogs.data,
        },
    };
}

export default Blogs;
