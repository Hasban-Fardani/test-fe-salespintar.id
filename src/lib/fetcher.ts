import request from "@/lib/request";

export const fetcher = (url: string) => request.get(url).then(res => res.data);