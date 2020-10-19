FROM gitpod/workspace-full:latest
FROM gitpod/workspace-mongodb

RUN bash -c ". .nvm/nvm.sh \
    && nvm install 14.9.0 \
    && nvm use 14.9.0 \
    && nvm alias default 14.9.0"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
