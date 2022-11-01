declare module Common {
    interface ApiResponse {
        date: number;
        message: string;
        status: number;
    }

    interface Error {
        date: number;
        message: string;
        status: number;
    }
}
