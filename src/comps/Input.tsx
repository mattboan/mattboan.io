import styles from '@/styles/input.comp.module.scss';

interface Props {
    label?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
}

export const Input = (props: Props) => {
    return (
        <div className={styles.input_wrapper}>
            {props.label && <label>{props.label}</label>}

            <input
                placeholder={props.placeholder || ''}
                type={props.type || 'text`'}
                value={props.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    props.onChange(e.target.value)
                }
            />
        </div>
    );
};
