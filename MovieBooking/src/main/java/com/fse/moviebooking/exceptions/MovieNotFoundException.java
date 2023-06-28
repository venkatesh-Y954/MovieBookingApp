package com.fse.moviebooking.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT, reason="Movie Not found, handled by custom exception")
public class MovieNotFoundException extends Exception{

}
