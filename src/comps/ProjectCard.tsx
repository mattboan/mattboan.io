import styles from '@/styles/project-card.comp.module.scss';
import { Project } from '@/db/project.def';
import Image from 'next/image';
import Link from 'next/link';

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link
            className={styles.project_card}
            tabIndex={0}
            href={`/projects/${project?.slug}`}
        >
            <Image
                src={project.header_img || '/img/tmp.png'}
                width={450}
                height={300}
                alt={'Project image'}
            />
            <h3>{project.heading}</h3>
            <p>{project.overview}</p>
        </Link>
    );
};
