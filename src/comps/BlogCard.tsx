import { Blog } from '@/db/blog.def';
import styles from '@/styles/blog-card.comp.module.scss';
import Image from 'next/image';

export const BlogCard = ({ blog }: { blog: Blog }) => {
    return (
        <div
            className={styles.blog_card}
            tabIndex={0}
            role="link"
            onClick={() => window.open('test', '_blank')}
        >
            <Image
                src={blog.header_img || '/img/tmp.png'}
                width={450}
                height={300}
                alt={'Blog image'}
            />
            <h3>{blog.heading}</h3>
            <p>{blog.overview}</p>
        </div>
    );
};
