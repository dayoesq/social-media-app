import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Profile: FC = () => {
    const { userName } = useParams();
    console.log(userName);
    return (
        <div>
            <h1>{userName}</h1>
        </div>
    );
};

export default Profile;
