import styles from '@/styles/post.module.scss';
import { Container } from '@/comps/Container';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import { Blog } from '@/db/blog.def';
import { client } from '@/utils/supa';
import { format } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from '../_error';
import { Footer } from '@/comps/Footer';
import { SubscribeCta } from '@/comps/SubscribeCta';

const BlogPost = ({ blog }: { blog: Blog }) => {
    const router = useRouter();

    if (router.isFallback || !blog?.published) {
        return <Error />;
    }

    return (
        <>
            <Head>
                <title>void - {blog.heading || 'Blog Post'}</title>
                <meta name="description" content={blog.overview || ''} />
            </Head>
            <main>
                <VoidHeader />
                <Section id="header-img">
                    <Container>
                        {blog.header_img && (
                            <Image
                                className={styles.header_image}
                                src={blog.header_img}
                                width={1000}
                                height={800}
                                alt={`${blog.heading} Image`}
                            />
                        )}
                        <h1 className={styles.heading}>{blog.heading}</h1>
                        <h2 className={styles.sub_heading}>
                            {blog.sub_heading}
                        </h2>
                        {blog.published && (
                            <div className={styles.published}>
                                {format(new Date(blog.published), 'dd-MM-yyyy')}{' '}
                                | by <span id="accent">matt boan</span>
                            </div>
                        )}
                    </Container>
                </Section>

                <Section id="post-content">
                    <Container>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: blog?.content || '',
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
        .from('Blog')
        .select('id')
        .not('published', 'is', null);

    const paths = data?.map((blog) => ({
        params: {
            id: String(blog.id),
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }: any) {
    const { data } = await client.from('Blog').select('*').eq('id', params.id);

    return {
        props: {
            blog: data?.[0] || null,
            revalidate: 60000,
        },
    };
}

export default BlogPost;
