// src/types/Movie.ts

export interface Movie {
    id: number;
    title: string;
    poster_path: string; // URL gambar poster
    release_date: string; // Tanggal rilis
    overview?: string; // Deskripsi film, opsional
}