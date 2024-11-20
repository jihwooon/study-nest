backend-start:
	docker run -d --name backend --platform linux/amd64 --restart unless-stopped -p 3000:3000 study-nest
