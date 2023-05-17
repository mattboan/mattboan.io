import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/supa';
import { v4 as uuid } from 'uuid';
import formidable from 'formidable';
import fs from 'fs';

// Get request for getting a single blog
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Add in authentication

    // Get the auth token
    console.log('Got the auth token: ', req.headers.authorization);

    // We need to grab the bearer token from the request
    const token = req?.headers?.authorization?.split(' ')?.[1];

    if (!token) return res.status(401).json({ message: 'Invalid token' });

    const { data, error } = await client.auth.getUser(token);

    if (error || !data.user) return res.status(401).send('Unauthorized.');

    switch (req.method) {
        case 'GET':
            return handleGetRequest(req, res);
        case 'POST':
            return handlePostRequest(req, res);
        case 'PUT':
            return handlePutRequest(req, res);
        case 'DELETE':
            return handleDeleteRequest(req, res);
        default:
            return res.status(500).send('Invalid request method.');
    }
};

// DELETE Handler
const handleDeleteRequest = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        // Get the id from the request query
        const id = req.query.id;
        if (!id) throw new Error('No id');

        await client.from('Blog').delete().eq('id', id);

        // Need to revalidate pages
        await res.revalidate(`/blogs/${id}`);
        await res.revalidate('/blogs');
        await res.revalidate('/');

        return res.status(200).json({
            deleted: true,
        });
    } catch (err) {
        return res.status(500).send('Failed to retrieve the blog post');
    }
};

// GET Request Handler
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Get the id from the request query
        const id = req.query.id;
        if (!id) throw new Error('No id');

        const blog = await getBlog(+id);

        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).send('Failed to retrieve the blog post');
    }
};

// PUT Request Handler
const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = Number(req.query.id);
        if (!id) throw new Error('No id!');

        // Get the blog
        let published: Date | null = new Date();
        const blog = await getBlog(id);
        if (!blog) throw new Error('Failed to get the blog');

        if (blog.published) {
            published = null;
        }

        // Update the blog published value
        const { error } = await client
            .from('Blog')
            .update({
                published,
            })
            .eq('id', id);

        await res.revalidate(`/blogs/${id}`);
        await res.revalidate('/blogs');
        await res.revalidate('/');

        // Return the updated blog
        return res.status(200).json(await getBlog(id));
    } catch (err) {
        console.error('Failed to PUT blog post: ', err);
        return res.status(500).send('Failed to retrieve the blog post');
    }
};

// POST Request Handler
const handlePostRequest = async (req: any, res: NextApiResponse) => {
    const id = req.query.id;
    if (!id) throw new Error('No id');

    const form = formidable({ multiples: true });

    const formData = new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log('Got the error: ', err);
                reject('error');
            }
            resolve({ fields, files });
        });
    });

    const { fields, files } = (await formData) as any;

    // Get the post we are referring too
    const blog = await getBlog(id);

    if (!blog) {
        return res.status(404).json({
            data: "Couldn't find the blog.",
        });
    }

    // Check if the body has a new header image
    if (files && files?.header_img) {
        console.log('File was provided!', files);
        // Just get the one file
        blog.header_img = await uploadHeaderImage(files);
    }

    // Update all the fields in supabase
    await client.from('Blog').upsert({
        ...blog,
        ...fields,
    });

    await res.revalidate('/');
    await res.revalidate('/blogs');
    await res.revalidate(`/blogs/${id}`);

    // Return the new blog
    return res.status(201).json(await getBlog(id));
};

// This function uploads the header image to the supabase bucket
const uploadHeaderImage = async (image: any) => {
    const file_content = await fs.promises.readFile(image.header_img.filepath); //this is what was missing!

    const { data, error } = await client.storage
        .from('header_img')
        .upload(`blog-${uuid()}.${image.header_img.name}`, file_content, {
            contentType: image.header_img.mimetype,
            cacheControl: '3600',
        });

    if (error) return null;
    return `https://xovjhtjkytzursvsbvbp.supabase.co/storage/v1/object/public/header_img/${data.path}`;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

// This function returns a blog
const getBlog = async (id: number) => {
    const { data } = await client.from('Blog').select('*').eq('id', id);
    const blog = data?.[0] ? data[0] : null;

    return blog;
};
