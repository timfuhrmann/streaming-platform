import React from "react";
import styled from "styled-components";
import { BlockProfile } from "../../app/layout/molecule/BlockProfile";
import { fillParent } from "@css/content";
import { profiles } from "@lib/mock/profile";
import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            hideNavigation: true,
        },
    };
};

export default Profile;
