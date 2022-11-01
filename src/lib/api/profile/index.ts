export const validateProfileCode = async (
    uid: string,
    code: string
): Promise<Common.ApiResponse | null> => {
    return fetch("/api/profile/code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
            uid,
        }),
    })
        .then(res => res.json())
        .catch(console.error);
};
