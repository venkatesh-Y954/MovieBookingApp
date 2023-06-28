package com.fse.moviebooking.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.NOT_ACCEPTABLE, reason="Seats not available already sold out")
public class NoTicketsAvailableException extends Exception{

}
