import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        // try
        // {
        //     const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});

        //     const updatedReviews = [...reviews, {body:rev.value}];
    
        //     rev.value = "";
    
        //     setReviews(updatedReviews);
        // }
        // catch(err)
        // {
        //     console.error(err);
        // }

        try {
            const response = await fetch("http://localhost:8090/api/v1/reviews", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ reviewBody: rev.value, imdbId: movieId })
            });
          
            if (!response.ok) {
              throw new Error('Failed to post review');
            }
          
            const result = await response.json();
            const updatedReviews = [...reviews, { body: rev.value }];
          
            rev.value = "";
          
            setReviews(updatedReviews);
          } catch (error) {
            console.error(error);
          }
          
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews