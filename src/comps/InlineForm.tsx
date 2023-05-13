import styles from '@/styles/inline-form.comp.module.scss';
import { ReactNode } from 'react';

export const InlineForm = ({ children }: { children: ReactNode }) => {
    return <div className={styles.inline_form}>{children}</div>;
};
