import {
    FC,
    useRef,
    useEffect,
    useContext,
    MutableRefObject,
    useState
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../../store/context';
import Button from '../../form-elements/Button/Button';
import ImageUploader from '../../form-elements/ImageUploader/ImageUploader';

import classes from './Status.module.scss';
import { useForm } from '../../../../hooks/form';
import { ASSETS_URL } from '../../../../utils/constants';

export type StatusProps = {
    onCloseStatus?: React.MouseEventHandler<SVGSVGElement>;
    onSubmitPost?: (data: any) => Promise<void>;
    rows?: number;
};

const Status: FC<StatusProps> = props => {
    const [postBody, setPostBody] = useState<string>('');
    const statusRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    const authCtx = useContext(AuthContext);
    const [formState, inputHandler] = useForm<{
        postImages: {
            isValid: boolean;
            value: string[];
        };
    }>(
        {
            postImages: {
                isValid: false,
                value: []
            }
        },
        false
    );

    const disableBtnHandler = (): boolean => {
        return !formState.isValid && postBody === '' ? true : false;
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostBody(e.target.value);
    };

    const submitPostHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        const imageArr = Array.from(formState.inputs?.postImages.value);
        formData.append('postBody', postBody);
        imageArr.forEach((image: unknown) => {
            formData.append('postImages', image as Blob);
        });
        if (props.onSubmitPost) props.onSubmitPost(formData);
    };

    useEffect(() => {
        statusRef.current?.focus();
    }, []);

    return (
        <div>
            <form
                className={classes.status}
                onSubmit={submitPostHandler}
                encType='multipart/form-data'
            >
                <div className={classes.statusHeader}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        size='2x'
                        color='#1aa1f5'
                        className={classes.iconTimes}
                        onClick={props.onCloseStatus}
                    />
                    <Button
                        type='submit'
                        primary
                        small
                        pillSmall
                        disabled={disableBtnHandler()}
                    >
                        Post
                    </Button>
                </div>
                <div className={classes.statusBody}>
                    <Avatar
                        small
                        rightSmall
                        alt={authCtx.user?.firstName}
                        src={`${ASSETS_URL}/${authCtx.user?.avatar}`}
                        userName={authCtx.user?.userName}
                    />
                    <label htmlFor='postBody'></label>
                    <textarea
                        className={classes.statusInput}
                        ref={statusRef}
                        id='postBody'
                        name='postBody'
                        placeholder={`What's on your mind ${authCtx.user?.firstName}?`}
                        value={postBody}
                        onChange={onChange}
                        rows={props.rows}
                    />
                </div>
                <div className={classes.statusFooter}>
                    <div className={classes.statusIcons}>
                        <FontAwesomeIcon
                            icon={faSmile}
                            size='2x'
                            color='#1aa1f5'
                            className={classes.icon}
                        />
                    </div>
                    <ImageUploader
                        id='postImages'
                        accept='.png, .jpeg, .jpg'
                        onInput={inputHandler}
                        iconClassName={classes.imageUploader}
                    />
                </div>
            </form>
        </div>
    );
};

Status.propTypes = {
    onCloseStatus: PropTypes.func,
    onSubmitPost: PropTypes.func,
    rows: PropTypes.number
};

export default Status;
