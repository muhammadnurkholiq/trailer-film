/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// material-ui
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Pagination,
  Skeleton,
  InputAdornment,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// project imports
import MovieDetail from './MovieDetail';
// third-party
import axios from 'axios';

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});

  const [search, setSearch] = useState('');
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // data
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setMovies([]);
      let response;

      if (search === '') {
        response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: 'cea7bb27f7967589b1f63bc9a8d88e9c',
            page: page,
          },
        });
      } else {
        response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: 'cea7bb27f7967589b1f63bc9a8d88e9c',
            query: search,
          },
        });
      }
      setTotalPage(response.data.total_pages);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, search]);

  // action
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setSelected(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected('');
  };

  return (
    <>
      <Grid container mb={10} spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <TextField
              variant="outlined"
              value={search}
              onChange={handleChangeSearch}
              placeholder="Cari Judul"
              size="medium"
              sx={{
                '& .MuiInputBase-input': {
                  color: '#fff',
                  borderColor: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                    borderRadius: '10px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'red',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#fff' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Pagination
              variant="outlined"
              shape="rounded"
              count={totalPage}
              page={page}
              onChange={handleChangePage}
              sx={{
                '& .MuiPaginationItem-root': {
                  backgroundColor: '#fff',
                },
                '& .Mui-selected': {
                  backgroundColor: 'red',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'red',
                  },
                },
                '& .MuiPaginationItem-page:hover': {
                  backgroundColor: 'red',
                  color: 'white',
                },
                '& .MuiPaginationItem-page.Mui-selected': {
                  backgroundColor: 'red',
                  color: 'white',
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {[1, 2, 3, 4].map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={key}>
                      <Card sx={{ height: '100%', backgroundColor: 'transparent' }}>
                        <CardMedia>
                          <Skeleton variant="rectangular" width="100%" height={300} sx={{ bgcolor: 'grey.500' }} />
                        </CardMedia>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {movies?.map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={key}>
                      <Card sx={{ height: '100%', bgcolor: 'transparent', boxShadow: 0, cursor: 'pointer' }} onClick={() => handleOpen(item)}>
                        <CardContent>
                          <Stack gap={2}>
                            <CardMedia
                              component="img"
                              height="250"
                              image={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                              title={item?.title}
                            />
                            <Stack>
                              <Typography variant="h6" sx={{ color: '#fff' }}>
                                {item?.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#fff' }}>
                                {item?.release_date}
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogContent>
          <MovieDetail data={selected} />
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 2 }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
