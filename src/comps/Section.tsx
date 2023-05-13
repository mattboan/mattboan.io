import styles from '@/styles/section.comp.module.scss';
import { ReactNode } from 'react';

export const Section = ({ children }: { children: ReactNode }) => {
    return <div className={styles.section}>{children}</div>;
};
