export interface Project {
    id: number;
    created_at: string;
    header_img: string;
    heading: string;
    sub_heading: string;
    overview: string;
    content: string;
    published: Date | null;
}
