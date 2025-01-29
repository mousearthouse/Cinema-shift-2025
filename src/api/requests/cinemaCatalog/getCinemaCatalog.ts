import { instance } from "@/api/instance";

interface CardsApiProps {
    onDataLoaded?: (data: Film[]) => void;
}

export interface ApiResponse {
    films: Film[];
}

const getCinemaCatalog = async ({ onDataLoaded }: CardsApiProps) => {
    const response = await instance.get<ApiResponse>(`/api/cinema/today`);
    if (onDataLoaded) {
        onDataLoaded(response.data.films);
    }
}

export default getCinemaCatalog
