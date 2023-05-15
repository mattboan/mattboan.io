import styles from '@/styles/textarea.comp.module.scss';

interface Props {
    label?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}

export const TextArea = (props: Props) => {
    return (
        <div className={styles.textarea_wrapper}>
            {props.label && <label>{props.label}</label>}

            <textarea
                rows={4}
                placeholder={props.placeholder || ''}
                value={props.value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    props.onChange(e.target.value)
                }
            />
        </div>
    );
};
