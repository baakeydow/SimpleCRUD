FROM    bndao/node:mongodb

# Bundle app source
COPY    src /home/devops/src
RUN     cd /home/devops/src ; npm install -g yo gulp-cli ; npm install

# App binds to port 8000 so need to EXPOSE 8000 to have it mapped by the docker daemon
EXPOSE  3000
