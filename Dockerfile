FROM elistreit/node:latest-onbuild

RUN yarn global add pm2

ENTRYPOINT ["pm2-docker", "start", "pm2.json"]