package dev.yash.movies;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    @Autowired
    private MovieService movieservice;
  @GetMapping
  public ResponseEntity<List<Movie>> getAllMovies(){
      return new ResponseEntity<List<Movie>> (movieservice.allMovies(), HttpStatus.OK);
  }

  @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieservice.singleMovie(imdbId), HttpStatus.OK);
  }

}
