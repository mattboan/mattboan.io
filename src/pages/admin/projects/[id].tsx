import { AdminHeader } from '@/comps/AdminHeader';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { ImageUpload } from '@/comps/ImageUpload';
import { Input } from '@/comps/Input';
import { Section } from '@/comps/Section';
import { TextArea } from '@/comps/TextArea';
import { VerticalForm } from '@/comps/VerticalForm';
import { Blog } from '@/db/blog.def';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import { admin_client } from '@/utils/admin_supa';
import { Session } from '@supabase/supabase-js';
import { Quill, modules, formats } from '@/comps/Quill';
import { Project } from '@/db/project.def';

const EditProject = () => {
    const router = useRouter();
    const { id } = useRouter().query;
    const [project, setProject] = useState<Project>(null!);
    const [header_img_file, setHeaderImageFile] = useState<File>(null!);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pubbing, setPubbing] = useState(false);
    const [error, setError] = useState('');
    const [session, setSession] = useState<Session | null>(null!);

    // Update the project object
    const update = (key: string, value: any) => {
        if (!project) return;
        setProject({
            ...project,
            [key]: value,
        });
    };

    // Gets the bearer token
    const getToken = () => {
        if (!session) return;

        return session.access_token;
    };

    // Get the blog post from supa
    const getProject = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer: ${getToken()}`,
                },
            });

            const temp = await res.json();

            setProject({ ...temp });
        } catch (err) {
            setError('Failed to retrieve the blog post.');
        }

        setLoading(false);
    };

    // Save the Project
    const saveProject = async () => {
        setSaving(true);
        setError('');

        try {
            const form_data = new FormData();

            // Construct the form data
            form_data.append('heading', project.heading || '');
            form_data.append('sub_heading', project.sub_heading || '');
            form_data.append('overview', project.overview || '');
            form_data.append('content', project.content || '');

            if (header_img_file)
                form_data.append('header_img', header_img_file);

            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'POST',
                body: form_data,
                headers: {
                    Authorization: `Bearer: ${getToken()}`,
                },
            });

            // Refresh the blog post
            setProject(await res.json());
        } catch (err) {
            console.error('Failed to save the blog post.');
        }

        setSaving(false);
    };

    // Publish / Unpublish a project post
    const pubUnPub = async () => {
        setPubbing(true);

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer: ${getToken()}`,
                },
            });

            setProject(await res.json());
        } catch (err) {
            console.error('Failed to publish: ', err);
        }

        setPubbing(false);
    };

    // Remove a project post
    const removeProject = async () => {
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer: ${getToken()}`,
                },
            });

            const { error } = await res.json();
            if (error) throw new Error(error);

            router.push('/admin/projects');
        } catch (err) {
            console.error('Failed to delete the preojct post!', err);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (session && id) getProject();
    }, [session, id]);

    useEffect(() => {
        admin_client.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push('/login');
            setSession(session);
        });
    }, []);

    if (!session) return <>Loading...</>;

    return (
        <>
            <Head>
                <title>void - Admin - Edit Blog</title>
                <meta name="robots" content="noindex" />
            </Head>
            <main>
                <AdminHeader />
                <Section id="admin-margin">
                    <Container>
                        <div className="flex-inline">
                            <Link
                                id="error"
                                onClick={() => removeProject()}
                                href={'#'}
                            >
                                Delete
                            </Link>
                            <Link href={`/projects/${id}`} target="_blank">
                                View blog
                            </Link>
                            <Button onClick={pubUnPub}>
                                {!pubbing
                                    ? project?.published
                                        ? 'Unpublish'
                                        : 'Publish'
                                    : 'Loading...'}
                            </Button>
                        </div>
                    </Container>
                </Section>
                {!loading ? (
                    <Section id="admin-margin">
                        <Container>
                            <h2>Edit Blog Post</h2>
                            <VerticalForm>
                                <ImageUpload
                                    image_url={project?.header_img || ''}
                                    onChange={(f) => setHeaderImageFile(f)}
                                />
                                <Input
                                    label="Heading"
                                    value={project?.heading || ''}
                                    onChange={(v) => update('heading', v)}
                                />
                                <Input
                                    label="Sub Heading"
                                    value={project?.sub_heading || ''}
                                    onChange={(v) => update('sub_heading', v)}
                                />
                                <TextArea
                                    label="Overview"
                                    value={project?.overview || ''}
                                    onChange={(v) => update('overview', v)}
                                />
                                <div className="quill-field">
                                    <label>Content</label>
                                    <Quill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={project?.content || ''}
                                        onChange={(e: string) =>
                                            update('content', e)
                                        }
                                    />
                                </div>
                                <Button onClick={() => saveProject()}>
                                    {saving ? 'Saving...' : 'Save'}
                                </Button>
                                {error && (
                                    <p id="error">{JSON.stringify(error)}</p>
                                )}
                            </VerticalForm>
                        </Container>
                    </Section>
                ) : (
                    <Section>
                        <Container>
                            <div className="center-me">
                                <PropagateLoader color="#fff" />
                            </div>
                        </Container>
                    </Section>
                )}
            </main>
        </>
    );
};

export default EditProject;
