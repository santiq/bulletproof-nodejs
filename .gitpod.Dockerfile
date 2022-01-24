FROM gitpod/workspace-full:latest
FROM gitpod/workspace-mongodb

RUN bash -c ". .nvm/nvm.sh \
    && nvm install lts/gallium \
    && nvm use lts/gallium \
    && nvm alias default lts/gallium"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
