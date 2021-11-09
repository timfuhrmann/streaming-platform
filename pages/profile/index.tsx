import React from "react";
import styled from "styled-components";
import { BlockProfile } from "../../app/layout/molecule/BlockProfile";
import { fillParent } from "@css/content";
import { profiles } from "@lib/mock/profile";

const ProfilesWrapper = styled.div`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Profile: React.FC = () => {
    return (
        <ProfilesWrapper>
            <BlockProfile profiles={profiles} />
        </ProfilesWrapper>
    );
};

export default Profile;
