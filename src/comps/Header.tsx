import styles from '@/styles/header.comp.module.scss';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface Props {
    logo?: string; // Image URL
    children: ReactNode;
}

/**
 * Expandable Header component, just a with a logo
 */
export const Header = (props: Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // Watch the open state and update the body overflow
    // useEffect(() => {
    //     if (open) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = '';
    //     }
    // }, [open]);

    return (
        <header className={styles.header}>
            <div className={styles.innerHeader}>
                {/* Logo - Home Button*/}
                {props.logo && (
                    <Image
                        onClick={() => router.push('/')}
                        className={styles.logo}
                        src={props.logo}
                        width={140}
                        height={30}
                        alt="mattboan.io logo"
                    />
                )}

                {/* Render the children */}
                <div className={styles.content}>
                    <div></div>
                    {props.children}
                </div>

                {/* Render the children in mobile view */}
                <motion.div
                    className={styles.mobileContent}
                    initial={{ top: 0 }}
                    animate={{ top: open ? 0 : -400 }}
                    transition={{ duration: 0.5 }}
                >
                    {props.children}
                </motion.div>

                {/* Render the menu button when in mobile view */}
                <div
                    className={styles.menuButton}
                    onClick={() => setOpen(!open)}
                >
                    <img src="/icons/menu.svg" width={30} height={30} />
                </div>
            </div>
        </header>
    );
};
