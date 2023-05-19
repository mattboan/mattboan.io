import styles from '@/styles/image-upload.comp.module.scss';
import { useRef, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

interface Props {
    image_url?: string;
    onChange: (v: File) => void;
}

export const ImageUpload = (props: Props) => {
    const [tmp, setTmp] = useState('');
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null!);

    const handleClick = () => inputRef?.current?.click();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the file
        const file = e.target.files?.[0];
        if (!file) {
            alert('Failed to get the file.');
            inputRef.current.value = ''; // Clear the image selection
            return;
        }

        upload(file);
    };

    const upload = async (file: File) => {
        setUploading(true);

        try {
            // Sets the file to the new header image
            const reader = new FileReader();
            reader.onload = () => {
                setTmp(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Pass the file to the parent
            props.onChange(file);
        } catch (err) {
            console.error('Failed to upload the image: ', err);
            alert('Failed to upload the image.');
        }

        setUploading(false);
    };

    return (
        <div className={styles.image_upload}>
            {/* Preview */}
            <div
                className={styles.image}
                onClick={handleClick}
                style={{
                    backgroundImage: `url('${tmp || props.image_url}')`,
                }}
            >
                {!props.image_url && !tmp && !uploading && <p>Upload image.</p>}
                {uploading && <PropagateLoader color="#fff" />}
            </div>

            {/* Input ref */}
            <input
                type="file"
                accept="image/*"
                onChange={handleInput}
                multiple={false}
                ref={inputRef}
            />
        </div>
    );
};
