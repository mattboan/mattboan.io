import styles from '@/styles/blog-list-item.comp.module.scss';
import { Blog } from '@/db/blog.def';
import { useRouter } from 'next/router';

export const BlogListCard = ({ blog, href }: { blog: Blog; href: string }) => {
    const router = useRouter();

    return (
        <div
            className={styles.blog_list_card_item}
            onClick={() => router.push(href)}
        >
            <div className={styles.left}>
                <div
                    className={styles.header_image}
                    style={{
                        backgroundImage: `url("${blog?.header_img}")`,
                    }}
                />
            </div>
            <div className={styles.right}>
                {/* Blog heading */}
                <h2>{blog.heading}</h2>

                {/* Blog overview */}
                <p>{blog.overview}</p>
            </div>
        </div>
    );
};
