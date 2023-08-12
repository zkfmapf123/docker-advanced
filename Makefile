health:
	@curl localhost:3000/health

todo:
	@curl localhost:3000/todos

create-todo:
	@curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"title": "test-title", "desc" : "test-desc"}' \
    localhost:3000/todos

###### Docker Compose ######
run:
	docker-compose up --build

f-run:
	docker-compose -f docker-compose.archiving.yaml up --build 