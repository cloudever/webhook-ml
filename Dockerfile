FROM elistreit/node:latest-onbuild

EXPOSE 3000:3000

RUN yarn global add pm2

ENTRYPOINT ["pm2-docker", "start", "pm2.json"]