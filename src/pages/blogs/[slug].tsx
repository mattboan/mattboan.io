import styles from '@/styles/post.module.scss';
import { Container } from '@/comps/Container';
import { Section } from '@/comps/Section';
import { VoidHeader } from '@/comps/VoidHeader';
import { Blog } from '@/db/blog.def';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Error from '../_error';
import { Footer } from '@/comps/Footer';
import { SubscribeCta } from '@/comps/SubscribeCta';
import { get_blogs, get_blog_by_slug } from '@/utils/blogs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

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
                                {blog.date} | by{' '}
                                <span id="accent">matt boan</span>
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
    const blogs = await get_blogs();

    const paths = await blogs.map((blog: Blog) => ({
        params: {
            slug: blog.slug,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }: any) {
    const fs = require('fs');
    const path = require('path');

    let blog = null;

    try {
        blog = await get_blog_by_slug(params?.slug);

        if (!blog) {
            return {
                notFound: true,
            };
        }

        // Get the file path
        const file_path = path.join(process.cwd(), blog.post_content_path);
        const temp = fs.readFileSync(file_path, 'utf-8');

        const matter_result = matter(temp);
        const parsed = await remark()
            .use(prism)
            .use(html, { sanitize: false }) // allow all HTML at your own risk
            .process(matter_result.content);

        blog.content = parsed.toString();
    } catch (err) {
        console.error('Failed to load the file.', err);
    }

    return {
        props: {
            blog: blog,
            revalidate: 60000,
        },
    };
}

export default BlogPost;
