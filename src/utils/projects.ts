import { Project } from "@/db/project.def";
import fs from "fs";
import path from "path";


/**
 * Gets the projects from the projects.json file
 */
export const get_projects = async (): Promise<Project[]> => {
    try {
        const projects_file_path = path.join(
            process.cwd(),
            '/projects/projects.json'
        );
        return JSON.parse(fs.readFileSync(projects_file_path, 'utf-8'));
    } catch (err) {
        return [];
    }
}

/**
 * Gets the project with the given id
 */
export const get_project = async (id: string): Promise<Project | null> => {
    try {
        const projects = await get_projects();
        return projects.find(project => Number(project.id) === Number(id)) || null;
    } catch (err) {
        return null;
    }
}

/**
 * Gets the project with the given slug
 */
export const get_project_by_slug = async (slug: string): Promise<Project | null> => {
    try {
        const projects = await get_projects();
        return projects.find(project => project.slug === slug) || null;
    } catch (err) {
        return null;
    }
}