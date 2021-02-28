FROM node:14-alpine

RUN mkdir -p /home/front

WORKDIR /home/front 
COPY ./front /home/front
RUN if [ -d "node_modules" ]; then rm -Rf node_modules; fi
RUN if [ -f "yarn.lock" ]; then rm yarn.lock; fi
RUN if [ -f "public/env.js" ]; then rm public/env.js; fi
RUN ls
RUN yarn 
RUN yarn global add serve
RUN echo "America/Recife" > /etc/timezone

# CMD ["sh","-c","yarn build && yarn serve"]
CMD ["sh","-c","yarn start"]