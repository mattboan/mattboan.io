import styles from '@/styles/button.comp.module.scss';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClick?: () => void;
    id?: string; // Allow the button to be used as alt, etc
}

export const Button = (props: Props) => {
    return (
        <button
            className={styles.button}
            onClick={() => props.onClick && props.onClick()}
        >
            {props.children}
        </button>
    );
};
