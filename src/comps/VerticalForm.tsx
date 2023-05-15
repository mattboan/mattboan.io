import styles from '@/styles/vertical-form.comp.module.scss';
import { ReactNode } from 'react';

export const VerticalForm = ({ children }: { children: ReactNode }) => {
    return <div className={styles.vertical_form}>{children}</div>;
};
