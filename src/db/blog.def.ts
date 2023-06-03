export interface Blog {
    id: number;
    created_at: Date;
    header_img: string;
    heading: string;
    sub_heading: string;
    overview: string;
    content: string;
    post_content_path?: string;
    published: boolean;
    date: string;
    slug: string;
}
