import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/supa';
import { v4 as uuid } from 'uuid';
import formidable from 'formidable';
import fs from 'fs';

// Handle incoming requests
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // We need to grab the bearer token from the request and check if we are authed
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

        await client.from('Project').delete().eq('id', id);

        // Need to revalidate pages
        await revalidate(res, +id);

        return res.status(200).json({
            deleted: true,
        });
    } catch (err) {
        return res.status(500).send('Failed to retrieve the project post');
    }
};

// GET Request Handler
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Get the id from the request query
        const id = req.query.id;
        if (!id) throw new Error('No id');

        const project = await getProject(+id);

        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).send('Failed to retrieve the project post');
    }
};

// PUT Request Handler
const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = Number(req.query.id);
        if (!id) throw new Error('No id!');

        // Get the project
        let published: Date | null = new Date();
        const project = await getProject(id);
        if (!project) throw new Error('Failed to get the project');

        if (project.published) {
            published = null;
        }

        // Update the project published value
        const { error } = await client
            .from('Project')
            .update({
                published,
            })
            .eq('id', id);

        await revalidate(res, id);

        // Return the updated project
        return res.status(200).json(await getProject(id));
    } catch (err) {
        return res.status(500).send('Failed to retrieve the project post');
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
    const project = await getProject(id);

    if (!project) {
        return res.status(404).json({
            data: "Couldn't find the Project.",
        });
    }

    // Check if the body has a new header image
    if (files && files?.header_img) {
        console.log('File was provided!', files);
        // Just get the one file
        project.header_img = await uploadHeaderImage(files);
    }

    // Update all the fields in supabase
    await client.from('Project').upsert({
        ...project,
        ...fields,
    });

    await revalidate(res, id);

    // Return the new project
    return res.status(201).json(await getProject(id));
};

// This function uploads the header image to the supabase bucket
const uploadHeaderImage = async (image: any) => {
    const file_content = await fs.promises.readFile(image.header_img.filepath); //this is what was missing!

    const { data, error } = await client.storage
        .from('header_img')
        .upload(`project-${uuid()}.${image.header_img.name}`, file_content, {
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

// This function returns a project
const getProject = async (id: number) => {
    const { data } = await client.from('Project').select('*').eq('id', id);
    return data?.[0] ? data[0] : null;
};

// Revalidate all the pages associated with the projects
const revalidate = async (res: NextApiResponse, id?: number) => {
    await res.revalidate('/');
    console.log("Revalidated '/'");
    await res.revalidate('/projects');
    console.log("Revalidated '/projects'");

    if (id) {
        await res.revalidate(`/projects/${id}`);
        console.log(`Revalidated '/projects/${id}'`);
    }
};
