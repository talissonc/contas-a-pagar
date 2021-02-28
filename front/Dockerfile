FROM node:14-alpine

RUN mkdir -p /home/front

WORKDIR /home/front 
COPY ./front /home/front
RUN rm -rf node_modules
RUN rm yarn.lock
RUN rm public/env.js
RUN ls
RUN yarn 
RUN yarn global add serve
RUN echo "America/Recife" > /etc/timezone

# CMD ["sh","-c","yarn build && yarn serve"]
CMD ["sh","-c","yarn start"]