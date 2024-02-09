/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// material-ui
import { Grid, CircularProgress, Stack } from '@mui/material';
// third-party
import axios from 'axios';
import YouTube from 'react-youtube';

export default function MovieDetail({ data }) {
  const [trailer, setTrailer] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(true);
  console.log(data);

  // data
  const fetchTrailer = async () => {
    try {
      setLoadingDetail(true);
      setTrailer([]);
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${data?.id}/videos`, {
        params: {
          api_key: 'cea7bb27f7967589b1f63bc9a8d88e9c',
        },
      });

      const trailers = response.data.results.filter((trailer) => trailer.type === 'Trailer');

      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        setTrailer(trailerKey);
      } else {
        setTrailer('not found');
        console.log('No trailers found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
    setLoadingDetail(false);
  };

  useEffect(() => {
    fetchTrailer();
  }, [data]);

  return (
    <Grid container spacing={2}>
      {loadingDetail ? (
        <Grid item xs={12}>
          <Stack alignItems="center" my={5}>
            <CircularProgress color="error" />
          </Stack>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <YouTube
            videoId={trailer}
            opts={{
              height: 350,
              width: '100%',
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}
