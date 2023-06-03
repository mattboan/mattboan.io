import { Blog } from '@/db/blog.def';
import { Project } from '@/db/project.def';
import fs from 'fs';
import path from 'path';

/**
 * Gets the blogs from the JSON file
 */
export const get_blogs = async (): Promise<Blog[]> => {
    try {
        const projects_file_path = path.join(
            process.cwd(),
            '/blogs/blogs.json'
        );
        return JSON.parse(fs.readFileSync(projects_file_path, 'utf-8'));
    } catch (err) {
        return [];
    }
};

/**
 * Gets the blog with the given id
 */
export const get_blog = async (id: string): Promise<Blog | null> => {
    try {
        const blogs = await get_blogs();
        return blogs.find((blog) => Number(blog.id) === Number(id)) || null;
    } catch (err) {
        return null;
    }
};

/**
 * Gets the blog with the given slug
 */
export const get_blog_by_slug = async (slug: string): Promise<Blog | null> => {
    try {
        const blogs = await get_blogs();
        return blogs.find((blog) => blog.slug === slug) || null;
    } catch (err) {
        return null;
    }
};
