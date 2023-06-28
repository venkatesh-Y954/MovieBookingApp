package com.fse.user.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT, reason="User with EmailId already Exists")
public class UserAlreadyExistsException extends Exception {

}
