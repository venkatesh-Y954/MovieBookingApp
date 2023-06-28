package com.fse.moviebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fse.moviebooking.model.Movie;

@Service
public class DataPublisherService 
{
	public static final String topic ="javafse";
	
	@Autowired
	private KafkaTemplate<String, String> temp;

	public KafkaTemplate<String, String> getTemp() {
		return temp;
	}

	
	public void setTemp(String string)
	{
		this.temp.send(topic, string);
		//return true;
	}

	public static String getTopic() {
		return topic;
	}
	
	

}
