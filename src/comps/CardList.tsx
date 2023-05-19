import styles from '@/styles/card-list.comp.module.scss';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Section } from './Section';

interface Props {
    heading?: string;
    children: ReactNode;
    read_more?: string;
}

export const CardList = (props: Props) => {
    const router = useRouter();

    return (
        <Section>
            <div className={styles.card_wrapper}>
                {props.heading && <h2>{props.heading}</h2>}
                <div className={styles.card_list}>{props.children}</div>
                {props.read_more && (
                    <div className={styles.read_more}>
                        <Button
                            onClick={() => router.push(props.read_more || '/')}
                        >
                            Read more
                        </Button>
                    </div>
                )}
            </div>
        </Section>
    );
};
