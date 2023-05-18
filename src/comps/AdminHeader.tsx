import { useRouter } from 'next/router';
import { Button } from './Button';
import { Header } from './Header';

export const AdminHeader = () => {
    const router = useRouter();

    return (
        <Header logo="/img/logo.png">
            <Button onClick={() => router.push('/')}>Go to live site</Button>
        </Header>
    );
};
