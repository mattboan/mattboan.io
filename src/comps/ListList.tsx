import styles from '@/styles/list-list.comp.module.scss';
import { ReactNode } from 'react';
import { PropagateLoader } from 'react-spinners';
import { Button } from './Button';
import { Section } from './Section';

interface Props {
    heading?: string;
    children: ReactNode;
    bottom_text?: string;
    onBottomClick?: () => void;
    loading?: boolean;
}

export const ListList = (props: Props) => {
    return (
        <div className={styles.list_wrapper}>
            {props.heading && <h2>{props.heading}</h2>}
            <div className={styles.list_list}>{props.children}</div>
            {props.bottom_text && (
                <>
                    {props.loading ? (
                        <div className="center-me">
                            <PropagateLoader color="#fff" />
                        </div>
                    ) : (
                        <div className={styles.read_more}>
                            <Button
                                onClick={() =>
                                    props.onBottomClick && props.onBottomClick()
                                }
                            >
                                {props.bottom_text}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
