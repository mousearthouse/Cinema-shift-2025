import { instance } from "@/api/instance";

interface ScheduleApiProps {
    onDataLoaded?: (data: Seances[]) => void;
}

export interface ApiResponse {
    schedules: Seances[];
}

const getFilmSchedule = async (filmId: number, { onDataLoaded }: ScheduleApiProps) => {
    const response = await instance.get<ApiResponse>(`/api/cinema/film/${filmId}/schedule`);
    if (onDataLoaded) {
        onDataLoaded(response.data.schedules);
    }
}

export default getFilmSchedule;