FROM node:argon

RUN npm install -g jspm

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN jspm install

EXPOSE 8080

CMD ["python", "-m", "SimpleHTTPServer", "8080"]