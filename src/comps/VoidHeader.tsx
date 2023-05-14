import styles from '@/styles/void-header.comp.module.scss';
import Link from 'next/link';
import { Button } from './Button';
import { Header } from './Header';

/**
 * This header is for composing the void header
 */
export const VoidHeader = () => {
    return (
        <Header logo="/img/logo.png">
            <div className={styles.headerLinks}>
                <Link href="/projects">Projects</Link>
                <Link href="/blogs">Blog </Link>
                <Link href="/about">About </Link>
            </div>
            <Button>Let's Connect</Button>
        </Header>
    );
};
