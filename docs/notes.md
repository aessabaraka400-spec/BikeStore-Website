# Technical Note

## Biggest Docker problem I faced and how I solved it

**Problem 1: old Docker version**
- My first `docker build` failed.
- The Docker Desktop version on my laptop was old.
- It could not pull the base image (`nginx:alpine`).
- The Dockerfile itself was correct.

**Solution**
- I updated Docker Desktop to the latest version.
- I ran `docker build` again and it worked.

**Problem 2: port conflict**
- I moved the project code into the `src/` folder.
- When I ran the container, port 8080 was already used by another container.
- Docker showed the error: `port is already allocated`.
- The failed container kept the name `bike-shop`, so the next run failed too.

**Solution**
- I removed the failed container: `docker rm -f bike-shop`.
- I ran the project on another port: `-p 8081:80`.

## Most important Git/GitHub lesson I learned

**Problem**
- My push to GitHub failed.
- My code editor was signed in with a different GitHub account (another email).

**Solution**
- I removed the old account from the editor settings.
- I signed in again and linked the editor to the correct account.
- The push succeeded.

**Lesson**
- Always check which account and email Git and the editor use before the first push.
- Use small commits with clear messages so the history is easy to follow.