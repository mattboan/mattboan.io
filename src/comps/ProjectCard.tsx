import styles from '@/styles/project-card.comp.module.scss';
import { Project } from '@/db/project.def';
import Image from 'next/image';

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div
            className={styles.project_card}
            tabIndex={0}
            role="link"
            onClick={() => window.open('test', '_blank')}
        >
            <Image
                src={project.header_img || '/img/tmp.png'}
                width={450}
                height={300}
                alt={'Project image'}
            />
            <h3>{project.heading}</h3>
            <p>{project.sub_heading}</p>
        </div>
    );
};
