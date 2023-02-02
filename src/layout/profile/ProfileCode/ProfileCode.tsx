import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { ProfileCodeInput } from "./ProfileCodeInput";
import { Content } from "@css/helper/content";

const CodeWrapper = styled(Content)``;

const CodeOverline = styled.h1`
    ${text("displaySm", "bold")};
    text-align: center;
    color: ${p => p.theme.gray600};
`;

const CodeHeadline = styled.div<{ $error: boolean }>`
    margin-top: 1rem;
    color: ${p => p.$error && p.theme.alert};
    ${text("displayLg", "bold")};
    text-align: center;
`;

const InputFields = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 6rem;
`;

const KEY_CODES = {
    BACKSPACE: "Backspace",
};

interface ProfileCode {
    error?: Common.Error | null;
    onChange: (value: string) => void;
}

export const ProfileCode: React.FC<ProfileCode> = ({ error, onChange }) => {
    const [code, setCode] = useState<Record<number, string>>({});
    const [focused, setFocused] = useState<number>(0);

    useEffect(() => {
        const str = Object.values(code).join("");
        onChange(str);
    }, [code]);

    useEffect(() => {
        if (!error) {
            return;
        }

        setFocused(0);
        setCode({});
    }, [error]);

    const handleKeyUp = (index: number, key: string) => {
        let direction = 1;

        if (key === KEY_CODES.BACKSPACE) {
            direction = -1;
            setCode(prevState => {
                delete prevState[index];
                return prevState;
            });
        } else if (!/[0-9]/.test(key) || index === 4) {
            return;
        } else {
            setCode(prevState => {
                return { ...prevState, [index]: key };
            });
        }

        setFocused(Math.min(3, index + direction));
    };

    return (
        <CodeWrapper>
            <CodeOverline>Profile lock active.</CodeOverline>
            <CodeHeadline $error={!!error}>
                {error ? error.message : "Please enter your code to access your profile."}
            </CodeHeadline>
            <InputFields>
                {[0, 1, 2, 3].map(index => (
                    <ProfileCodeInput
                        key={index}
                        value={code[index] ? "•" : ""}
                        focused={index === focused}
                        onKeyUp={key => handleKeyUp(index, key)}
                    />
                ))}
            </InputFields>
        </CodeWrapper>
    );
};
