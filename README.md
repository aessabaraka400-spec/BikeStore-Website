# BikeStore-Website

A multi-page bicycle shop website with Home, About, Services, Blog, Shop, FAQ and Contact pages. It is served by Nginx inside a Docker container.

## Tech Stack
- HTML5
- CSS3
- JavaScript
- Nginx (Alpine)
- Docker

## How to Build and Run with Docker
1. Open a terminal in the project folder.
2. Build the image:

       docker build -t bike-shop-website .

3. Run the container:

       docker run -d --name bike-shop -p 8081:80 bike-shop-website

4. Open http://localhost:8081 in the browser.

## How to Stop the Container and Clean Up
1. Stop the container:

       docker stop bike-shop

2. Remove the container:

       docker rm bike-shop

3. Remove the image (optional):

       docker rmi bike-shop-website

## Configuration Notes
- The container listens on port 80 (Nginx).
- The host port is 8081 (`-p 8081:80`). If this port is already in use, choose another one, for example `-p 8082:80`, and open that port in the browser.
- No environment variables are required.
- The website source code is in the `src/` folder (`html/`, `css/`, `js/`, `img/`).

## How to Test
1. Check that the container is running and healthy:

       docker ps

   The status should show `(healthy)`.

2. Open http://localhost:8081 in the browser.
3. The home page should load with styles and images. Use the navigation bar to open the other pages (About, Services, Blog, Shop, FAQ, Contact).

## Attribution
Original work. This project was designed and developed for the OS Lab assignment.