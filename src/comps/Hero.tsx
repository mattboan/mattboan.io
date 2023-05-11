import styles from "@/styles/hero.comp.module.scss";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

/**
 * Hero Component
 */
export const Hero = (props: Props) => {
    return (
        <div className={styles.hero}>
            {props.children}
        </div>
    )
}