import React from 'react';

interface MovieCardProps {
    movie: {
        title: string;
        vote_average: number;
        poster_path: string;
        release_date: string;
        original_language: string;
    }
}

const MovieCard = (movieCardProps: MovieCardProps) => {

    return (
        <div className="movie-card">
            <img src={ movieCardProps.movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movieCardProps.movie.poster_path}` : '/no-movie.png' } alt={ movieCardProps.movie.title } />
            <div className="mt-4">
                <h3>{ movieCardProps.movie.title }</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt=""/>
                        <p>
                            {movieCardProps.movie.vote_average ?
                                movieCardProps.movie.vote_average.toFixed(1)
                                :
                                'N/A'
                            }
                        </p>
                    </div>
                    <span>•</span>
                    <p className="lang">
                        {movieCardProps.movie.original_language}
                    </p>
                    <span>•</span>
                    <p className="year">
                        {movieCardProps.movie.release_date ? movieCardProps.movie.release_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;