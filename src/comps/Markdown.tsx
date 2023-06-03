import { useEffect } from 'react';
import readline from 'readline';

interface Props {
    markdown: string; // The markdown text -> TODO: Refactor this to be a buffer so that large files can be processed in parrallel without massive memory usage
}

export const Markdown = (props: Props) => {
    const render_markdown = () => {
        // Break up the markdown into lines
        // const lines = props.markdown.split('\n');

        // for (const line of lines) {
        //     console.log('Got the line: ', line);
        //     get_format(line);
        // }

        let command = '';
        let html = '';

        for (const char of props.markdown) {
            console.log('got the char: ', char);
        }
    };

    useEffect(() => {
        render_markdown();
    }, [props.markdown]);

    return (
        <div className="md-render">
            <h2>Markdown render </h2>
        </div>
    );
};
