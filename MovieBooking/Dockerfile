FROM openjdk:11-jdk-slim
VOLUME /tmp
COPY target/moviebookingapp.jar moviebookingapp.jar
ENTRYPOINT ["java","-jar", "/moviebookingapp.jar"]