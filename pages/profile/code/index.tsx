import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BlockCode } from "../../../app/layout/molecule/BlockCode";
import { fillParent, square } from "@css/content";
import { useRouter } from "next/router";
import { IconX } from "@icon/IconX";
import { transition } from "@css/transition";
import { validateProfileCode } from "@lib/api/profile";

const CodeWrapper = styled.div`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.a`
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    color: ${p => p.theme.gray600};
    ${transition("color", "0.2s")};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

const Close = styled(IconX)`
    ${square("6rem")};
`;

const Code: React.FC = () => {
    const router = useRouter();
    const { uid } = router.query;
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<Common.Error | null>(null);

    useEffect(() => {
        if (code.length === 4) {
            submitCode();
        }
    }, [code, uid]);

    const submitCode = async () => {
        if (!uid || typeof uid !== "string") {
            return;
        }

        const res = await validateProfileCode(uid, code);

        if (!res) {
            return router.replace("/profile");
        }

        switch (res.status) {
            case 400:
                return setError(res);
            case 500:
                return router.replace("/profile");
            default:
                return router.replace("/");
        }
    };

    return (
        <CodeWrapper>
            <Link href="/profile" passHref>
                <CloseButton>
                    <Close />
                </CloseButton>
            </Link>
            <BlockCode error={error} onChange={setCode} />
        </CodeWrapper>
    );
};

export default Code;
