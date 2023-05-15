import { AdminHeader } from '@/comps/AdminHeader';
import { Button } from '@/comps/Button';
import { Container } from '@/comps/Container';
import { ImageUpload } from '@/comps/ImageUpload';
import { Input } from '@/comps/Input';
import { Section } from '@/comps/Section';
import { TextArea } from '@/comps/TextArea';
import { VerticalForm } from '@/comps/VerticalForm';
import { Blog } from '@/db/blog.def';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { set } from 'lodash';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

const EditBlog = () => {
    const router = useRouter();
    const { id } = useRouter().query;
    const [blog, setBlog] = useState<Blog>(null!);
    const [header_img_file, setHeaderImageFile] = useState<File>(null!);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pubbing, setPubbing] = useState(false);
    const [error, setError] = useState('');

    // Update the blog object
    const update = (key: string, value: any) => {
        if (!blog) return;
        setBlog({
            ...blog,
            [key]: value,
        });
    };

    // Get the blog post from supa
    const getBlogPost = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer: ${token}`
                },
            });

            const temp = await res.json();
            console.log('Got the temp: ', temp);

            setBlog({ ...temp });
        } catch (err) {
            setError('Failed to retrieve the blog post.');
        }

        setLoading(false);
    };

    // Save the blog
    const saveBlogPost = async () => {
        setSaving(true);
        setError('');

        try {
            const form_data = new FormData();

            // Construct the form data
            form_data.append('heading', blog.heading || '');
            form_data.append('sub_heading', blog.sub_heading || '');
            form_data.append('overview', blog.overview || '');
            form_data.append('content', blog.content || '');

            if (header_img_file)
                form_data.append('header_img', header_img_file);

            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: 'POST',
                body: form_data,
                headers: {
                    // "Authorization": `Bearer: ${token}`
                },
            });

            // Refresh the blog post
            setBlog(await res.json());
        } catch (err) {
            console.error('Failed to save the blog post.');
        }

        setSaving(false);
    };

    // Publish / Unpublish a blog post
    const pubUnPub = async () => {
        setPubbing(true);

        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: 'PUT',
            });

            setBlog(await res.json());
        } catch (err) {
            console.error('Failed to publish: ', err);
        }

        setPubbing(false);
    };

    useEffect(() => {
        if (id) getBlogPost();
    }, [id]);

    return (
        <>
            <Head>
                <title>void - Edit Blog</title>
                <meta name="description" content="TODO" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AdminHeader />
                <Section id="admin-margin">
                    <Container>
                        <div className="flex-inline">
                            <Link href={`/blogs/${id}`} target="_blank">
                                View blog
                            </Link>
                            <Button onClick={pubUnPub}>
                                {!pubbing
                                    ? blog?.published
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
                                    image_url={blog?.header_img || ''}
                                    onChange={(f) => setHeaderImageFile(f)}
                                />
                                <Input
                                    label="Heading"
                                    value={blog?.heading || ''}
                                    onChange={(v) => update('heading', v)}
                                />
                                <Input
                                    label="Sub Heading"
                                    value={blog?.sub_heading || ''}
                                    onChange={(v) => update('sub_heading', v)}
                                />
                                <TextArea
                                    label="Overview"
                                    value={blog?.overview || ''}
                                    onChange={(v) => update('overview', v)}
                                />
                                <div className="quill-field">
                                    <label>Content</label>
                                    <QuillNoSSRWrapper
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={blog?.content || ''}
                                        onChange={(e: string) =>
                                            update('content', e)
                                        }
                                    />
                                </div>
                                <Button onClick={() => saveBlogPost()}>
                                    {saving ? 'Saving...' : 'Save'}
                                </Button>
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

export default EditBlog;

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'code'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code',
];
