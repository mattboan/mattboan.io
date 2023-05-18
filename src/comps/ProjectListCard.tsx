import styles from '@/styles/project-list-item.comp.module.scss';
import { useRouter } from 'next/router';
import { Project } from '@/db/project.def';

export const ProjectListCard = ({
    project,
    href,
}: {
    project: Project;
    href: string;
}) => {
    const router = useRouter();

    return (
        <div
            className={styles.project_list_card_item}
            onClick={() => router.push(href)}
        >
            <div className={styles.left}>
                <div
                    className={styles.header_image}
                    style={{
                        backgroundImage: `url("${project?.header_img}")`,
                    }}
                />
            </div>
            <div className={styles.right}>
                {/* Project heading */}
                <h2>{project.heading}</h2>

                {/* Project overview */}
                <p>{project.overview}</p>
            </div>
        </div>
    );
};
