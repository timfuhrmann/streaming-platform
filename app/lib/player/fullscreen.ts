export const fullscreenApis: Record<string, Player.FullscreenApi> = {
    ms: {
        request: "msRequestFullscreen",
        element: "msFullscreenElement",
        exit: "msExitFullscreen",
    },
    moz: {
        request: "mozRequestFullScreen",
        element: "mozFullScreenElement",
        exit: "mozCancelFullScreen",
    },
    webkit: {
        request: "webkitRequestFullscreen",
        element: "webkitFullscreenElement",
        exit: "webkitCancelFullScreen",
    },
};

export const handleFullscreen = (container: HTMLElement) => {
    return new Promise<boolean>((resolve, reject) => {
        for (let apiKey in fullscreenApis) {
            if (fullscreenApis.hasOwnProperty(apiKey)) {
                const api = fullscreenApis[apiKey];

                // @ts-ignore
                if (container[api.request]) {
                    // @ts-ignore
                    if (document[api.element]) {
                        // @ts-ignore
                        document[api.exit]();
                        resolve(false);
                    } else {
                        // @ts-ignore
                        container[api.request]();
                        resolve(true);
                    }

                    break;
                }
            }
        }

        reject();
    });
};
