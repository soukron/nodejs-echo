# base image
FROM registry.redhat.io/ubi8/nodejs-12:latest

# copy application code
COPY app /opt/app-root/src

# install dependencies
WORKDIR /opt/app-root/src
RUN npm install

# expose the port and run the server
EXPOSE 8080/tcp
CMD ["/usr/bin/npm", "start"]
