import styles from '@/styles/hero.comp.module.scss';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

/**
 * Hero Component
 */
export const Hero = (props: Props) => {
    return (
        <div className={styles.hero}>
            <div className={styles.inner_hero}>{props.children}</div>
        </div>
    );
};
