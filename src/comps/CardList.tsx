import styles from '@/styles/card-list.comp.module.scss';
import { ReactNode } from 'react';
import { Section } from './Section';

interface Props {
    heading?: string;
    children: ReactNode;
}

export const CardList = (props: Props) => {
    return (
        <Section>
            <div className={styles.card_wrapper}>
                {props.heading && <h2>{props.heading}</h2>}
                <div className={styles.card_list}>{props.children}</div>
            </div>
        </Section>
    );
};
