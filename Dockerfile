FROM node:latest
COPY . /yaml-parser/
WORKDIR /yaml-parser
RUN npm install
RUN npm install -g istanbul

RUN chmod +x test.sh

ENTRYPOINT ["./test.sh"]
