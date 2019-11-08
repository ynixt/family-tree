FROM openjdk:8-jdk-alpine as build
WORKDIR /bk
 
COPY . /bk
RUN cd /bk && ./gradlew build
CMD java -jar /bk/build/libs/family-tree.jar