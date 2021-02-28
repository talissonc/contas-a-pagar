FROM node:14-alpine

RUN mkdir -p /home/server

WORKDIR /home/server 
COPY ./server /home/server
RUN if [ -d "node_modules" ]; then rm -Rf node_modules; fi
RUN if [ -f "yarn.lock" ]; then rm yarn.lock; fi
RUN yarn 
RUN echo "America/Recife" > /etc/timezone

CMD ["sh","-c","yarn knex:migrate && yarn knex:seeds && yarn dev"]