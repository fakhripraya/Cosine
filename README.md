# Cosine (Pintrail)

## Setup
### Use this to build container

docker build -f Dockerfile.local -t [image-name] .  
docker run -d -p 3000:3000 --name [name] [image-name]

### If using compose

docker-compose -f docker-compose.yml -f [yml] up

### Monitoring

docker logs <container-id>
docker ps
docker ps -a

