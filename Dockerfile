FROM node:latest
COPY . /yaml-parser/
WORKDIR /yaml-parser
RUN npm install
RUN npm install -g typescript
RUN npm install -g tsd
RUN npm install -g ts-node
RUN npm install -g gulp-cli
RUN npm install -g tsd 
RUN npm install -g typings
RUN npm install -g gulp
RUN npm install -g istanbul

RUN chmod +x test.sh

ENTRYPOINT ["./test.sh"]
