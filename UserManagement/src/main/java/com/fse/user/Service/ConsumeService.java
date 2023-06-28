package com.fse.user.Service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumeService 
{
	@KafkaListener(topics="javafse", groupId="mygroup")
	public void consumeFromTopic(String message)
	{
		System.out.println("Consumer message: "+ message);
	}

}