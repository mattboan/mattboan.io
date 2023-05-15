import styles from '@/styles/section.comp.module.scss';
import { ReactNode } from 'react';

export const Section = ({
    children,
    id,
}: {
    children: ReactNode;
    id?: string;
}) => {
    return (
        <div className={styles.section} id={id}>
            {children}
        </div>
    );
};
