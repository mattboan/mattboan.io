import styles from "@/styles/footer.comp.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';

export const Footer = () => {
    const router = useRouter();


    return (
        <div className={styles.footer}>
            <div className={styles.footer_inner}>
                <div className={styles.footer_section}>
                    <Image
                        onClick={() => router.push('/')}
                        className={styles.logo}
                        src="/img/logo.png"
                        width={140}
                        height={30}
                        alt="Void logo"
                    />
                    <div className={styles.email}>
                        <Link href="mailto:matt@voidstudios.com.au">matt@voidstudios.com.au</Link>
                    </div>
                    <div className={styles.socials}>

                        <Link href="https://www.instagram.com/voidstudiosau/">
                            <Image src="/icons/insta.png" width={20} height={20} alt="Instagram" />
                        </Link>
                        <Link href="https://au.linkedin.com/in/matt-boan-656561129/">
                            <Image src="/icons/linkedin.png" width={20} height={20} alt="LinkedIn" />
                        </Link>
                        <Link href="https://www.facebook.com/voidstudiosau/">
                            <Image src="/icons/fb.png" width={20} height={20} alt="Facebook" />
                        </Link>
                    </div>
                </div>
                <div className={styles.footer_section}>
                    <Link href="/">/Home</Link>
                    <Link href="/projects">/Projects</Link>
                    <Link href="/blogs">/Blogs</Link>
                    <Link href="/about">/About</Link>
                </div>
            </div>
            <div className={styles.copy}>
                <p>&copy; {new Date().getFullYear()} void | matt boan  </p>
            </div>
        </div>
    )
}