// material-ui
import { Container, Grid, Typography } from '@mui/material';

// project imports
import Movie from './Movie';

export default function App() {
  return (
    <Container>
      <Grid container gap={3}>
        <Grid item xs={12} textAlign="center" mt={5}>
          <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
            Trailer <span style={{ color: 'red' }}>Film</span>
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Movie />
        </Grid>
      </Grid>
    </Container>
  );
}
